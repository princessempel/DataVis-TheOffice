import pandas as pd
import nltk
from nltk.corpus import cmudict
from nltk.tokenize import word_tokenize, sent_tokenize
from collections import Counter

# Ensure you have these downloaded
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('cmudict')

# Load CMU Pronouncing Dictionary for syllable count
cmu_dict = cmudict.dict()

# Function to calculate POS percentages
def calculate_pos_percentages(lines):
    words = [word.lower() for line in lines for word in word_tokenize(line) if word.isalpha()]
    pos_tags = nltk.pos_tag(words)

    # Count specific POS
    noun_count = sum(1 for _, tag in pos_tags if tag.startswith('NN'))  # Nouns
    verb_count = sum(1 for _, tag in pos_tags if tag.startswith('VB'))  # Verbs
    adj_count = sum(1 for _, tag in pos_tags if tag.startswith('JJ'))  # Adjectives

    total_count = len(words)
    if total_count == 0:
        return {'Nouns (%)': 0, 'Verbs (%)': 0, 'Adjectives (%)': 0}

    # Calculate percentages
    return {
        'Nouns (%)': (noun_count / total_count) * 100,
        'Verbs (%)': (verb_count / total_count) * 100,
        'Adjectives (%)': (adj_count / total_count) * 100
    }

# Read dataset
file_path = "the-office_lines.csv"  # Replace with your actual file path
df = pd.read_csv(file_path)

# List of main characters
main_characters = [
    'Michael', 'Dwight', 'Pam', 'Jim', 
    'Kelly', 'Phyllis', 'Andy', 'Darryl',
    'Oscar', 'Angela', 'Ryan', 'Erin',
    'Toby', 'Stanley', 'Meredith', 'Kevin',
    'Creed'
]

# Filter dataset to include only main characters
df = df[df['Character'].isin(main_characters)]

# Group by character and compute metrics
character_metrics = {}
for character in main_characters:
    character_lines = df[df['Character'] == character]['Line'].dropna()
    metrics = calculate_pos_percentages(character_lines)
    character_metrics[character] = metrics

# Print metrics for each character
for character, metrics in character_metrics.items():
    print(f"\nMetrics for {character}:")
    for key, value in metrics.items():
        print(f"{key}: {value:.2f}")

# Save metrics to JSON
import json
with open("character_metrics_POS.json", "w") as f:
    json.dump(character_metrics, f, indent=4)
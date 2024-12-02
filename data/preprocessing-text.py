import pandas as pd
import nltk
from nltk.corpus import cmudict
from nltk.tokenize import word_tokenize, sent_tokenize
from collections import Counter

# Ensure you have these downloaded
nltk.download('punkt')
nltk.download('cmudict')

# Load CMU Pronouncing Dictionary for syllable count
cmu_dict = cmudict.dict()

# Function to count syllables in a word
def count_syllables(word):
    word = word.lower()
    if word in cmu_dict:
        return max([len([phoneme for phoneme in pron if phoneme[-1].isdigit()]) for pron in cmu_dict[word]])
    else:
        return 1  # Approximation for unknown words

# Read dataset
file_path = "./the-office_lines.csv"  # Replace with your actual file path
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

# Function to compute metrics
def compute_metrics(lines):
    words = [word.lower() for line in lines for word in word_tokenize(line) if word.isalpha()]
    sentences = [sent for line in lines for sent in sent_tokenize(line)]

    # Average word length
    avg_word_length = sum(len(word) for word in words) / len(words) if words else 0

    # Syllables per word
    total_syllables = sum(count_syllables(word) for word in words)
    syllables_per_word = total_syllables / len(words) if words else 0

    # Average sentence length (words per sentence)
    avg_sentence_length = len(words) / len(sentences) if sentences else 0

    # Hapax Legomena (words that occur only once)
    word_counts = Counter(words)
    hapax_legomena = sum(1 for count in word_counts.values() if count == 1)

    return {
        "Average Word Length": avg_word_length,
        "Syllables per Word": syllables_per_word,
        "Average Sentence Length": avg_sentence_length,
        "Hapax Legomena": hapax_legomena

    }

# Group by character and compute metrics
character_metrics = {}
for character in main_characters:
    character_lines = df[df['Character'] == character]['Line'].dropna()
    metrics = compute_metrics(character_lines)
    character_metrics[character] = metrics

# Print metrics for each character
for character, metrics in character_metrics.items():
    print(f"\nMetrics for {character}:")
    for key, value in metrics.items():
        print(f"{key}: {value:.2f}")

# Save metrics to JSON
import json
with open("dv-theoffice/public/data/character_metrics_pos.json", "w") as f:
    json.dump(character_metrics, f)
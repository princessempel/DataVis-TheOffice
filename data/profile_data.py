import pandas as pd
import json
import numpy as np

# Detect and fix encoding issues
lines_scripts = pd.read_csv('the-office-lines - scripts.csv', encoding='ISO-8859-1')  # Replace with detected encoding

# Clean text to remove invalid characters
lines_scripts['line_text'] = lines_scripts['line_text'].replace(r'[^\x00-\x7F]+', "'", regex=True)
lines_scripts['line_text'] = lines_scripts['line_text'].str.strip()

# Step 1: Load the combined dataset
combined = pd.read_csv('combined_dataset.csv')  # Replace with your actual file path

# Step 2: Define the 17 main characters
main_characters = [
    'Michael', 'Dwight', 'Pam', 'Jim', 
    'Kelly', 'Phyllis', 'Andy', 'Darryl',
    'Oscar', 'Angela', 'Ryan', 'Erin',
    'Toby', 'Stanley', 'Meredith', 'Kevin',
    'Creed'
]

# Step 3: Find top 5 most-viewed episodes for each character
character_data = {}

for character in main_characters:
    # Get top 5 episodes by viewership for the character
    top_episodes = (
        combined[combined[f'{character}_lines'] > 0]
        .sort_values(by='viewership_mil', ascending=False)
        .head(5)
        .assign(
            episode=lambda x: 'S' + x['season'].astype(str) + ' E' + x['episode_number'].astype(int).astype(str)
        )
        [['episode', 'episode_title']]
        .to_dict(orient='records')
    )
    
    # Convert numpy types to Python native types for JSON compatibility
    top_episodes = [
        {k: (v.item() if isinstance(v, (np.int64, np.float64)) else v) for k, v in d.items()}
        for d in top_episodes
    ]
    
    # Total episodes the character appeared in
    total_episodes = int((combined[f'{character}_lines'] > 0).sum())
    
    # Add the data to the dictionary
    character_data[character] = {
        "top_episodes": top_episodes,
        "total_episodes_appeared": total_episodes
    }

# Step 4: Get first and last lines for each character
lines_scripts = lines_scripts[lines_scripts['deleted'] == False]  # Exclude deleted lines

for character in main_characters:
    # Filter the lines dataset for the character
    character_lines = lines_scripts[lines_scripts['speaker'] == character]
    
    # Get first and last line
    first_line = character_lines.iloc[0]['line_text'] if not character_lines.empty else None
    last_line = character_lines.iloc[-1]['line_text'] if not character_lines.empty else None
    
    # Add to the dictionary
    character_data[character]["first_line"] = first_line
    character_data[character]["last_line"] = last_line

# Step 5: Save to JSON
output_path = '../dv-theoffice/public/data/character_data.json'
with open(output_path, 'w', encoding='utf-8') as json_file:
    json.dump(character_data, json_file, ensure_ascii=False, indent=4)

print(f"Character data saved successfully to {output_path}")

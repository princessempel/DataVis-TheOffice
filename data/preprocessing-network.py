import pandas as pd
import json
from collections import defaultdict

# Input and output file paths
original_file = 'data/the-office-lines - scripts.csv'
alias_file = 'data/the_office_aliases.json'
node_output_file = 'dv-theoffice/public/data/network_nodes.json'
edge_output_file = 'dv-theoffice/public/data/network_edges.json'

# Load the dialogue dataset
df = pd.read_csv(original_file)

# Load the alias dictionary
with open(alias_file, 'r') as file:
    aliases = json.load(file)

# Define main characters
main_character_names = [
    "Michael", "Jim", "Pam", "Dwight", "Kelly", "Andy", "Darryl",
    "Oscar", "Angela", "Ryan", "Toby", "Stanley", "Kevin", "Creed", "Meredith"
]

# Function to detect mentions using aliases
def detect_mentions_with_aliases(line, speaker, aliases):
    mentions = []
    for character, alias_list in aliases.items():
        # Check if the character's name or any of their aliases is mentioned in the line
        all_names = [character] + alias_list
        if any(name in line for name in all_names) and character != speaker:
            mentions.append(character)
    return mentions

# Initialize edges dictionary for aggregation
aggregated_edges = defaultdict(lambda: {
    'total': 0,
    'season': defaultdict(int),
    'episode': defaultdict(int)
})

# Process each line of dialogue to detect mentions
for _, row in df.iterrows():
    speaker = row['speaker']
    line = row['line_text']
    season = int(row['season'])
    episode = int(row['episode'])

    # Detect mentions
    mentions = detect_mentions_with_aliases(line, speaker, aliases)

    # Aggregate mentions by season and episode
    for mention in mentions:
        aggregated_edges[(speaker, mention)]['total'] += 1
        aggregated_edges[(speaker, mention)]['season'][season] += 1
        aggregated_edges[(speaker, mention)]['episode'][(season, episode)] += 1

# Convert aggregated edges to final list format
final_edges_list = []
for (source, target), data in aggregated_edges.items():
    # Only include edges between main characters
    if source in main_character_names and target in main_character_names:
        final_edges_list.append({
            'source': source,
            'target': target,
            'mentions': data['total'],  # Total mentions
            'season_mentions': dict(data['season']),  # Mentions by season
            'episode_mentions': {f"season-{s}-episode-{e}": count for (s, e), count in data['episode'].items()}  # Mentions by episode
        })

# Filter nodes to include only main characters
nodes_list = [{'id': character} for character in main_character_names]

# Save nodes and edges as JSON
with open(node_output_file, 'w') as f:
    json.dump(nodes_list, f, indent=4)

with open(edge_output_file, 'w') as f:
    json.dump(final_edges_list, f, indent=4)

# Display example results
print("Nodes:", nodes_list[:5])
print("Edges:", final_edges_list[:5])
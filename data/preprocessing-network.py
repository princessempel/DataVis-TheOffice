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
    "Oscar", "Angela", "Ryan", "Toby", "Stanley", "Kevin", "Creed"
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

# Initialize edges dictionary
edges = defaultdict(int)

# Process each line of dialogue to detect mentions
for _, row in df.iterrows():
    speaker = row['speaker']
    line = row['line_text']
    
    # Detect mentions
    mentions = detect_mentions_with_aliases(line, speaker, aliases)
    
    # Create or update edges
    for mention in mentions:
        edges[(speaker, mention)] += 1

# Extract unique nodes
nodes = set(df['speaker']).union(aliases.keys())

# Filter for main characters or characters with aliases
allowed_characters = set(main_character_names).union(aliases.keys())

# Filter nodes
nodes_list = [{'id': node} for node in nodes if node in allowed_characters]

# Filter edges
edges_list = [
    {'source': source, 'target': target, 'mentions': weight}
    for (source, target), weight in edges.items()
    if source in allowed_characters and target in allowed_characters
]

# Ensure all edge nodes are in nodes_list
edge_nodes = {edge['source'] for edge in edges_list}.union({edge['target'] for edge in edges_list})
for node in edge_nodes:
    if node not in {n['id'] for n in nodes_list}:
        nodes_list.append({'id': node})

# Save nodes and edges as JSON
with open(node_output_file, 'w') as f:
    json.dump(nodes_list, f, indent=4)

with open(edge_output_file, 'w') as f:
    json.dump(edges_list, f, indent=4)

# Display example results
print("Nodes:", nodes_list[:5])
print("Edges:", edges_list[:5])

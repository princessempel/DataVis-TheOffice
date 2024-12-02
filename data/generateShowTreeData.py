import csv
import json
from collections import defaultdict

def generate_select_options_from_csv(csv_file, output_json):
    select_options = []

    # Group data by season and episode
    grouped_data = defaultdict(lambda: defaultdict(list))

    with open(csv_file, "r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            # Skip deleted rows
            if row["deleted"].lower() == "true":
                continue
            season = f"Season {row['season']}"
            episode = f"Episode {row['episode']}"
            grouped_data[season][episode].append(row)

    # Build the React-Select options structure
    for season, episodes in grouped_data.items():
        season_group = {
            "label": season,
            "options": []  # Grouped options for each season
        }
        for episode in episodes:
            episode_option = {
                "label": episode,  # Episode label
                "value": f"season-{season.split(' ')[1]}-episode-{episode.split(' ')[1]}"
            }
            season_group["options"].append(episode_option)

        select_options.append(season_group)

    # Save to JSON
    with open(output_json, "w") as json_file:
        json.dump(select_options, json_file, indent=4)

    print(f"React-Select options JSON saved to {output_json}")

csv_file = "data/the-office-lines - scripts.csv"
output_json = "dv-theoffice/public/data/show_select_options.json"
generate_select_options_from_csv(csv_file, output_json)

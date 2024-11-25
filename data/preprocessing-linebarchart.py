import pandas as pd

# File paths
original_file_path = 'data/the_office_episodes.csv'
output_file_path = 'dv-theoffice/public/data/the_office_episodes_processed.csv'

# Load the data
data = pd.read_csv(original_file_path)

# Combine season and episode for grouping
data['x_label'] = 'S' + data['season'].astype(str) + 'E' + data['episode_number'].astype(str)

# Ensure ratings, scaled_ratings, and viewership_mil are numeric
for column in ['ratings', 'scaled_ratings', 'viewership_mil']:
    data[column] = pd.to_numeric(data[column], errors='coerce').fillna(0)

# Save only the necessary columns
data[['x_label', 'season', 'episode_number', 'ratings', 'scaled_ratings', 'viewership_mil']].to_csv(output_file_path, index=False)

# Verify the processed file
processed_data = pd.read_csv('data/the_office_episodes_processed.csv')
print(processed_data.head())
print(processed_data[['ratings', 'scaled_ratings', 'viewership_mil']].isnull().sum())

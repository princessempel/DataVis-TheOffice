import pandas as pd

# Load the lines dataset
lines = pd.read_csv('the-office-lines - scripts.csv')  # Replace with your file path

# Filter out deleted lines
lines = lines[lines['deleted'] == False]

# Step 1: Count lines per speaker per episode
lines_agg = (
    lines.groupby(['season', 'episode', 'speaker'])
    .size()
    .reset_index(name='lines_spoken')
)

# Step 2: Filter for the 17 main characters
main_characters = [
    'Michael', 'Dwight', 'Pam', 'Jim', 
    'Kelly', 'Phyllis', 'Andy', 'Darryl',
    'Oscar', 'Angela', 'Ryan', 'Erin',
    'Toby', 'Stanley', 'Meredith', 'Kevin',
    'Creed'
]

# Keep only rows where the speaker is in the main characters list
lines_agg = lines_agg[lines_agg['speaker'].isin(main_characters)]

# Step 3: Pivot to create columns for line counts
lines_pivot = lines_agg.pivot(
    index=['season', 'episode'], 
    columns='speaker', 
    values='lines_spoken'
).fillna(0)  # Replace NaN with 0 (no lines spoken)

# Rename columns to include "_lines"
lines_pivot.columns = [f"{col}_lines" for col in lines_pivot.columns]

# Step 4: Add 0-indexed 'id' column
lines_pivot = lines_pivot.reset_index()
lines_pivot['id'] = lines_pivot.groupby('season').cumcount()  # Add a sequential ID per season

# Step 5: Count scenes per speaker per episode
scenes_agg = (
    lines.groupby(['season', 'episode', 'scene', 'speaker'])
    .size()
    .reset_index(name='scene_count')
)

# Filter scenes_agg for main characters only
scenes_agg = scenes_agg[scenes_agg['speaker'].isin(main_characters)]

# Count the number of scenes each speaker appears in per episode
scenes_pivot = scenes_agg.pivot_table(
    index=['season', 'episode'], 
    columns='speaker', 
    values='scene_count',
    aggfunc='count',  # Count the number of unique scenes
    fill_value=0
)

# Rename columns to include "_scenes"
scenes_pivot.columns = [f"{col}_scenes" for col in scenes_pivot.columns]

# Step 6: Combine line and scene counts
combined_pivot = pd.merge(
    lines_pivot,
    scenes_pivot,
    left_on=['season', 'episode'],
    right_on=['season', 'episode'],
    how='left'
).fillna(0)

combined_pivot.reset_index(drop=True, inplace=True)
combined_pivot['index'] = combined_pivot.index

# Step 7: Save the filtered dataset to a CSV file
combined_pivot.to_csv('filtered_lines_and_scenes_pivot.csv', index=False)

# Optional: Save to an Excel file
# combined_pivot.to_excel('filtered_lines_and_scenes_pivot.xlsx', index=False)

# Step 8: Print a success message
print("Filtered dataset with line and scene counts for main characters saved successfully!")

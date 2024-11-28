import pandas as pd

# Step 1: Load the second dataset
episodes = pd.read_csv('the_office_episodes.csv')  # Replace with your actual file name
lines = pd.read_csv('filtered_lines_and_scenes_pivot.csv')

combined = pd.merge(
    lines,  # Lines dataset with character line counts
    episodes,  # Episode metadata dataset
    left_on=['season', 'index'],  # Match season and episode
    right_on=['season', 'episode_number'],  # Match season and adjusted_episode
    how='left'  # Use left join to retain all episodes in the lines dataset
)
# columns to drop
columns_to_remove = [
    'episode', 'id', 'index', 'votes', 'duration', 'release_date', 'guest_stars', 'director', 'writers', 'has_guests'
]
# Step 4: Remove the unwanted columns
combined = combined.drop(columns=columns_to_remove, errors='ignore')  # Ignore if column doesn't exist


# Step 5: Save the combined dataset
combined.to_csv('../dv-theoffice/public/data/combined_dataset.csv', index=False)  # Save as CSV
# Optional: Save as Excel
# combined.to_excel('combined_dataset.xlsx', index=False)

# Step 6: Confirm the save
print("Combined dataset saved successfully!")

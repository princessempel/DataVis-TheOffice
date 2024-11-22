import pandas as pd

# Step 1: Load the second dataset
episodes = pd.read_csv('office_episodes.csv')  # Replace with your actual file name
lines = pd.read_csv('filtered_lines_and_scenes_pivot.csv')
# # Find episodes present in the episodes dataset but missing in the lines dataset
# missing_episodes = episodes[
#     ~episodes.set_index(['season', 'episode_number']).index.isin(
#         lines.set_index(['season', 'index']).index
#     )
# ]

# print("Missing episodes in lines dataset:")
# print(missing_episodes)
# # Check the ranges of the index and episode_number columns
# print("Lines dataset episode range:", lines['index'].min(), "-", lines['index'].max())
# print("Episodes dataset index range:", episodes['episode_number'].min(), "-", episodes['episode_number'].max())


combined = pd.merge(
    lines,  # Lines dataset with character line counts
    episodes,  # Episode metadata dataset
    left_on=['season', 'index'],  # Match season and episode
    right_on=['season', 'episode_number'],  # Match season and adjusted_episode
    how='left'  # Use left join to retain all episodes in the lines dataset
)

# Step 5: Save the combined dataset
combined.to_csv('combined_dataset.csv', index=False)  # Save as CSV
# Optional: Save as Excel
# combined.to_excel('combined_dataset.xlsx', index=False)

# Step 6: Confirm the save
print("Combined dataset saved successfully!")

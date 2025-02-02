// Function to display saved goals
function displayGoals(goals) {
  const savedGoalsList = document.getElementById('saved-goals');
  savedGoalsList.innerHTML = ''; // Clear the list

  goals.forEach((goal, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = goal;

    // Add a "Remove" button for each goal
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeGoal(index);
    });

    listItem.appendChild(removeButton);
    savedGoalsList.appendChild(listItem);
  });
}

// Function to remove a goal
function removeGoal(index) {
  chrome.storage.sync.get('goals', (data) => {
    const goals = data.goals ? data.goals.split(',') : [];
    goals.splice(index, 1); // Remove the goal at the specified index
    chrome.storage.sync.set({ goals: goals.join(',') }, () => {
      displayGoals(goals); // Update the displayed goals
    });
  });
}

// Load saved goals when the popup opens
chrome.storage.sync.get('goals', (data) => {
  const goals = data.goals ? data.goals.split(',') : [];
  displayGoals(goals);
});

// Save new goals
document.getElementById('save').addEventListener('click', () => {
  const newGoals = document.getElementById('goals').value;
  if (!newGoals) return;

  chrome.storage.sync.get('goals', (data) => {
    const existingGoals = data.goals ? data.goals.split(',') : [];
    const updatedGoals = [...existingGoals, ...newGoals.split(',')];
    chrome.storage.sync.set({ goals: updatedGoals.join(',') }, () => {
      displayGoals(updatedGoals); // Update the displayed goals
      document.getElementById('goals').value = ''; // Clear the input field
    });
  });
});
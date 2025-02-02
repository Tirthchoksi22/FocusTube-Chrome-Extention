chrome.storage.sync.get('goals', (data) => {
  const goals = data.goals ? data.goals.toLowerCase().split(',') : [];
  if (goals.length === 0) return;

  const filterRecommendations = () => {
    const recommendations = document.querySelectorAll('#video-title, #video-title-link');
    recommendations.forEach((element) => {
      const title = element.textContent.toLowerCase();
      const matchesGoal = goals.some((goal) => title.includes(goal.trim()));
      if (!matchesGoal) {
        element.closest('ytd-video-renderer, ytd-rich-item-renderer')?.remove();
      }
    });
  };

  // Run the filter when the page loads and when new content is loaded
  filterRecommendations();
  const observer = new MutationObserver(filterRecommendations);
  observer.observe(document.body, { childList: true, subtree: true });
});
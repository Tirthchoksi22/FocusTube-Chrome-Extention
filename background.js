chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received:", request);
    sendResponse({ status: "success" });
  });
chrome.runtime.onInstalled.addListener(() => {
// Save data
chrome.storage.local.set({ userGoals: "Complete extension project" }, () => {
    console.log("Data saved!");
});

// Retrieve data
chrome.storage.local.get("userGoals", (data) => {
    console.log("Data retrieved:", data);
});
});
    
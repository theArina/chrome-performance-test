let sumtime;

chrome.browserAction.onClicked.addListener(() => {
  sumtime = Date.now();
  chrome.tabs.create({
    active: false,
    url: 'https://www.electronjs.org/',
  }, ({ id }) => {
    chrome.tabs.executeScript(id, { file: 'src/script.js', runAt: 'document_start' });
  });
});

chrome.runtime.onMessage.addListener(() => {
  console.log('result', Date.now() - sumtime)
});

const num = 5;
let tabsCount = 0;
let sumtime;
const pagesTime = [];

chrome.browserAction.onClicked.addListener(() => {
  sumtime = Date.now();
  for (let count = 0; count < num; count++) {
    chrome.tabs.create({
      active: false,
      url: 'https://www.electronjs.org/',
    }, ({ id }) => {
      chrome.tabs.executeScript(id, { file: 'src/script.js', runAt: 'document_start' });
    });
  }
});

chrome.runtime.onMessage.addListener(() => {
  pagesTime.push(Date.now() - sumtime);
  tabsCount++;
  if (tabsCount === num) {
    const summary = pagesTime.reduce((accumulator, currentValue) => accumulator + currentValue);
    console.log('pagesTime', pagesTime);
    console.log('average', summary / pagesTime.length);
  }
});

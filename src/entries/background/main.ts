import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

browser.tabs.onCreated.addListener( (t)=> {
  console.log("new tab")
  browser.tabs.update(t.id, {muted:true})
})

browser.tabs.onActivated.addListener( (ai)=> {
  console.log("tab switch")
  browser.tabs.update(ai.tabId, {muted:true})
})

browser.tabs.onUpdated.addListener((tid, ci, t) => {
  console.log("tab updated")
  browser.tabs.update(tid, {muted:true})
})
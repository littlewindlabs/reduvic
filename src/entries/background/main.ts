import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

browser.action.onClicked.addListener( ()=> { 
  browser.storage.local.get(["enabled"]).then( (result) => {
    let curState = result.enabled;
    setState( !curState );
  })
});

function setState( isOn:Boolean) {
  let bg = "#FFFFFF";
  let badgeText = "OFF";
  let textColour = "#4F4F4F";
  let actionTitle = "Turn on Reduvic";
  if ( isOn ) {
    bg = "#318053";
    badgeText = "ON";
    textColour = "#FFFFFF";
  }
  browser.storage.local.set( { "enabled": isOn } ).then( ()=> {
    browser.action.setBadgeBackgroundColor( { color: bg} );
    browser.action.setBadgeTextColor( {color: textColour } );
    browser.action.setBadgeText( {text: badgeText} )
    browser.action.setTitle( {title: actionTitle } )
  })
}
// browser.tabs.onCreated.addListener( (t)=> {
//   console.log("new tab")
//   browser.tabs.update(t.id, {muted:true})
// })

// browser.tabs.onActivated.addListener( (ai)=> {
//   console.log("tab switch")
//   browser.tabs.update(ai.tabId, {muted:true})
// })

// browser.tabs.onUpdated.addListener((tid, ci, t) => {
//   console.log("tab updated")
//   browser.tabs.update(tid, {muted:true})
// })
import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.set({"enabled":false}).then( () => { setState( false ) } );
  console.log("Extension installed");
});

getExtensionState().then( (isEnabled) => { setBadge(isEnabled) } )

const allHostsPerm = {
    "origins": ["<all_urls>"],
  }

let hasPermission = false;
browser.permissions.contains( allHostsPerm ).then( (didSucceed) => { hasPermission = didSucceed })
console.log("Has user granted necessary permission? " + hasPermission)

browser.permissions.onRemoved.addListener( (perms)=>{
  if (perms.origins?.includes( allHostsPerm["origins"][0]) ){
    hasPermission = false;
  }
})

browser.action.onClicked.addListener( ()=>{
  if (!hasPermission){
    browser.permissions.request( allHostsPerm ).then( (didSucceed) => { 
      hasPermission = didSucceed
      console.log("User granted access")
      if (didSucceed){
        getExtensionState().then( ( isEnabled )=>{
          setState(!isEnabled)
        })
      }
      else {
        console.log("User denied access")
      }
    })
  }
  else { 
    getExtensionState().then( ( isEnabled )=>{
      setState(!isEnabled)
    })
  }
})

function getExtensionState() {
  return browser.storage.local.get(["enabled"]).then((result)=>{return result.enabled})
}

function setState( isOn:Boolean) {
  browser.storage.local.set( { "enabled": isOn } ).then( ()=> {
    setBadge(isOn)
  })
}

function setBadge( isOn:Boolean) {
  let bg = "#FFFFFF";
  let badgeText = "OFF";
  let textColour = "#4F4F4F";
  let actionTitle = `Turn ${isOn ? "off" : "on"} Reduvic`;
  if ( isOn ) {
    bg = "#318053";
    badgeText = "ON";
    textColour = "#FFFFFF";
  }
  browser.action.setBadgeBackgroundColor( { color: bg} );
  browser.action.setBadgeTextColor( {color: textColour } );
  browser.action.setBadgeText( {text: badgeText} )
  browser.action.setTitle( {title: actionTitle } )
}
<script lang="ts">
  import browser from "webextension-polyfill"

  function createRandomString(length:number=36){ //36 is the default length of a uuid
    const letters = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const chars = letters + numbers
    let str = letters.charAt( Math.random() * (letters.length) ) //CSS selectors must start with a letter,not
    for (let i = 1; i < length; i++) {
      const index = Math.random() * (chars.length)
      str = str + chars.charAt(index);
    }
    return str
  }

  var mutationObserver: MutationObserver;

  let randomizedClass = createRandomString()
  const style = document.createElement("style")
  style.textContent = `.${randomizedClass} { filter: grayscale(100%); }`
  document.head.appendChild(style)

  browser.storage.local.get("enabled").then( (data)=> {
    const enabled: Boolean = data["enabled"]
    if (enabled) {
      setup()
    }
  })

  browser.storage.local.onChanged.addListener( (storageChange) => {
    const enabled = storageChange['enabled']['newValue']
    if (enabled == true) {
      setup()
    }
    else if ( enabled == false ) {
      teardown()
    }
  })

  async function setup() { 
    processImgs()
    processVideos()

    if (!mutationObserver) {
      mutationObserver = new MutationObserver(function(mutations) {
        browser.storage.local.get("enabled").then((data)=>{
          let enabled = data['enabled']
          let shouldProcess = false;
          if (enabled) {
            mutations.forEach(function(mutation) {
              if (mutation.type === 'childList' || mutation.type === 'attributes') {
                shouldProcess = true;
              }
            });

            if (shouldProcess) { 
              processImgs()
              processVideos()
            }
          }
        })
      })
    }
    
    mutationObserver.observe(document.documentElement, {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true,
      attributeOldValue: true,
      characterDataOldValue: true
    });
  }
  
  async function teardown() {
    mutationObserver.disconnect()
    const els= document.querySelectorAll("." + randomizedClass)
    for (const el of els) {
      el.classList.remove(randomizedClass)
    }
  }

  function processImgs () {
    const images = document.getElementsByTagName("img")
    for (const image of images){
      if (!image.classList.contains(randomizedClass) ){
        image.classList.add(randomizedClass)
      }
    }

    const elBgImgList = document.querySelectorAll("[style*=background-image]")
    for (const elBgImg of elBgImgList) {
      if (!elBgImg.classList.contains(randomizedClass) ){
        elBgImg.classList.add(randomizedClass)
      }
    }
  }

  function processVideos () { 
    const videos = document.getElementsByTagName("video")
    for (const video of videos) {
      if (!video.classList.contains(randomizedClass) ){
        video.classList.add(randomizedClass)
      }      
    }
  }
</script>
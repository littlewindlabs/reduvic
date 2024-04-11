<script lang="ts">
  import browser from "webextension-polyfill"

  console.log("Content script is now active")

  var mutationObserver: MutationObserver;

  browser.storage.local.get("enabled").then( (data)=> {
    const enabled: Boolean = data["enabled"]
    if (enabled) { 
      setup()
    }
  })

  chrome.storage.local.onChanged.addListener( (storageChange) => {
    const enabled = storageChange['enabled']['newValue']
    if (enabled == true) {
      setup()
      console.log("Reduvic enabled")
    }
    else if ( enabled == false ) {
      teardown()
      console.log("Reduvic disabled")
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
              console.log("observed DOM update")
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
    const els= document.querySelectorAll(".redactive")
    for (const el of els) {
      el.classList.remove("redactive")
    }
  }

  function processImgs () {
    console.log("processing images")
    const images = document.getElementsByTagName("img")
    for (const image of images){
      console.log("found image")
      if (!image.classList.contains('redactive') ){
        image.classList.add("redactive")
        image.addEventListener("mouseenter", (e)=> {image.classList.add("skipRedactive")})
        image.addEventListener("mouseleave", (e)=> {image.classList.remove("skipRedactive")})
      }
    }

    const elBgImgList = document.querySelectorAll("[style*=background-image]")
    for (const elBgImg of elBgImgList) {
      console.log("found element with background image")
      if (!elBgImg.classList.contains('redactive') ){
        elBgImg.classList.add("redactive")
        elBgImg.addEventListener("mouseenter", (e)=> {elBgImg.classList.add("skipRedactive")})
        elBgImg.addEventListener("mouseleave", (e)=> {elBgImg.classList.remove("skipRedactive")})
      }
    }
  }

  function processVideos () { 
    console.log("Processing videos")
    const videos = document.getElementsByTagName("video")
    for (const video of videos) {
      if (!video.classList.contains('redactive') ){
        video.classList.add('redactive')
        video.removeAttribute("autoplay")
      }      
    }
  }
</script>
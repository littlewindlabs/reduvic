<script lang="ts">
    import { walk } from "svelte/compiler";

  console.log("Content script is now active")

  processImgs()
  
  var mutationObserver = new MutationObserver(function(mutations) {
    let shouldProcess = true;

    // mutations.forEach(function(mutation) {
    //   if (mutation.type === 'childList' || mutation.type === 'attributes') {
    //     shouldProcess = true;
    //   }
    // });

    if (shouldProcess) { 
      processImgs()
      processVideos()
      console.log("relevant DOM update")
    }
  });

  mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });

  // document.addEventListener("readystatechange", (event) => {
  //   console.log("ready state changed" + event)
  //   processImgs()
  // })
  // function addCss () {
  //   let rule = "img.redactive {filter: grayscale(100%)}"
  //   rule += " div {background-color: red}"
  //   let css = document.createElement('style')
  //   css.appendChild(document.createTextNode(rule))
  //   console.log("added css")
  // }

  function disableFilter(e: Element){
    e.classList.add("skipRedactive")
  }

  function enableFilter(e: Element){
    e.classList.add("skipRedactive")
  }

  function processImgs () {
    console.log("processing images")
    const images = document.getElementsByTagName("img")
    for (const image of images){
      console.log("found image")
      if (!image.classList.contains('skipRedact') && !image.classList.contains('redactive') ){
        image.classList.add("redactive")
        image.addEventListener("mouseenter", (e)=> {image.classList.add("skipRedactive")})
        image.addEventListener("mouseleave", (e)=> {image.classList.remove("skipRedactive")})
      }
    }

    const elBgImgList = document.querySelectorAll("[style*=background-image]")
    for (const elBgImg of elBgImgList) {
      console.log("found element with background image")
      if (!elBgImg.classList.contains('skipRedact') && !elBgImg.classList.contains('redactive') ){
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
      if (!video.classList.contains('skipRedact') && !video.classList.contains('redactive') ){
        let parent = video.parentNode;
        let hidingwrapper = document.createElement('div');
        hidingwrapper.style.position = video.style.position;
        hidingwrapper.style.height = "" + video.height
        hidingwrapper.style.width = "" + video.width
        hidingwrapper.classList.add('redactive')
        hidingwrapper.style.visibility = "hidden"

        const container = document.createElement('div')

        const button = document.createElement("button")
        button.style.position = "absolute"
        button.style.minWidth = "44px"
        button.style.minHeight = "44px"
        button.style.width = "100%"
        button.style.height = "100%"
        button.innerText = "Display video"
        button.style.zIndex = '10'
      
        button.addEventListener("click", function () {
          if (parent) { parent.replaceChild(video,container) }
          this.remove()
          hidingwrapper.remove()
          container.remove()
        })
        
        if (parent){
          parent.replaceChild(container, video)
          hidingwrapper.appendChild(video)
          container.appendChild(hidingwrapper)
          container.appendChild(button)
        }
        console.log("video wrapped")
 
        video.classList.add('redactive')
        video.removeAttribute("autoplay")
        video.volume = 0
      }      
    }
  }
</script>
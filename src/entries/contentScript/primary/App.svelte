<script lang="ts">
    import { walk } from "svelte/compiler";

  console.log("Content script is now active")

  processImgs()
  
  var mutationObserver = new MutationObserver(function(mutations) {
    let shouldProcessImgs = false;

    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        shouldProcessImgs = true;
      }
    });

    if (shouldProcessImgs) { 
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
        // let parent = video.parentNode;
        // let wrapper = document.createElement('div');
        // wrapper.classList.add('redactive')
        // if (parent){
        //   parent.replaceChild(wrapper, video)
        //   wrapper.appendChild(video)
        // }
        video.classList.add('redactive')
      }
    }
  }
</script>
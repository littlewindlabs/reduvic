<script lang="ts">

  console.log("Content script is now active")

  processImgs()
  
  var mutationObserver = new MutationObserver(function(mutations) {
    let shouldProcess = false;

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
  });

  mutationObserver.observe(document.documentElement, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    characterDataOldValue: true
  });

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
        video.classList.add('redactive')
        video.removeAttribute("autoplay")
        video.volume = 0
      }      
    }
  }
</script>
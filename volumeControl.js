const STORAGE_ID = "yvmc-volume";
let player = null, video = null, volumeDisplay = null;
init();


function init() {
    player = document.getElementById("movie_player");
    if(!player) {
        setTimeout(init, 1000);
        return;
    }
    console.log(player);
    video = player.querySelector("video");

    volumeDisplay = {
        element: buildVolumeDisplay(),
        timer: null
    }
    player.prepend(volumeDisplay.element);
    
    video.onvolumechange = saveVolume;
    video.onwheel = e => {
        changeVolume(e);
        displayVolume();
    }
    
    loadVolume();
}

function changeVolume(e) {
    e.preventDefault();

    let volume = player.getVolume();

    if(e.deltaY < 0) // Scroll up, increase volume
        player.setVolume(Math.floor(volume + 1));
    else // Scroll down, decrease volume
        player.setVolume(Math.ceil(volume - 1));
}

function saveVolume() {
    localStorage.setItem(STORAGE_ID, player.getVolume());
}

function loadVolume() {
    let storedVolume = localStorage.getItem(STORAGE_ID);
    if(storedVolume)
        player.setVolume(storedVolume);
}

function displayVolume() {
    let { element, timer } = volumeDisplay;
    element.innerHTML = `${player.getVolume()}%`;
    element.style.visibility = "visible";
    
    if(timer)
        clearTimeout(timer);
    
    timer = setTimeout(() => element.style.visibility = "hidden", 2000);
    volumeDisplay.timer = timer;
}

function buildVolumeDisplay() {
    let e = document.createElement("div");
    let s = e.style;
    
    s.position = "absolute";
    s.zIndex = "100";
    s.fontSize = "24px";
    s.padding = "0.4%";
    s.backgroundColor = "black";
    s.color = "white";
    s.margin = "1%";
    s.visibility = "hidden";

    return e;
}
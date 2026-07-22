7/22/26   3:42 PM

const videoPlayer = document.getElementById("video

const videoPlayer = document.getElementById("videoPlayer");

const mediaFile = document.getElementById("mediaFile");

const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");

const rewindBtn = document.getElementById("rewindBtn");
const forwardBtn = document.getElementById("forwardBtn");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const volumeSlider = document.getElementById("volumeSlider");
const playbackSpeed = document.getElementById("playbackSpeed");

const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let playlist = [];
let currentIndex = 0;

mediaFile.addEventListener("change", function () {

    playlist = Array.from(this.files);

    if (playlist.length > 0) {

        currentIndex = 0;

        loadMedia(currentIndex);

    }

});

function loadMedia(index){

    const file = playlist[index];

    if(!file) return;

    const url = URL.createObjectURL(file);

    videoPlayer.src = url;

    videoPlayer.load();

}

playBtn.addEventListener("click", function(){

    videoPlayer.play();

});

pauseBtn.addEventListener("click", function(){

    videoPlayer.pause();

});

stopBtn.addEventListener("click", function(){

    videoPlayer.pause();

    videoPlayer.currentTime = 0;

});

rewindBtn.addEventListener("click", function(){

    videoPlayer.currentTime -= 10;

});

forwardBtn.addEventListener("click", function(){

    videoPlayer.currentTime += 10;

});

previousBtn.addEventListener("click", function () {

    if (playlist.length === 0) return;

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = playlist.length - 1;

    }

    loadMedia(currentIndex);

    videoPlayer.play();

});

nextBtn.addEventListener("click", function () {

    if (playlist.length === 0) return;

    currentIndex++;

    if (currentIndex >= playlist.length) {

        currentIndex = 0;

    }

    loadMedia(currentIndex);

    videoPlayer.play();

});

videoPlayer.addEventListener("loadedmetadata", function () {

    progressBar.max = Math.floor(videoPlayer.duration);

    totalTime.textContent = formatTime(videoPlayer.duration);

});

videoPlayer.addEventListener("timeupdate", function () {

    progressBar.value = Math.floor(videoPlayer.currentTime);

    currentTime.textContent = formatTime(videoPlayer.currentTime);

});

progressBar.addEventListener("input", function () {

    videoPlayer.currentTime = this.value;

});

volumeSlider.addEventListener("input", function () {

    videoPlayer.volume = this.value;

});

playbackSpeed.addEventListener("change", function () {

    videoPlayer.playbackRate = this.value;

});

videoPlayer.addEventListener("ended", function () {

    if (playlist.length > 1) {

        currentIndex++;

        if (currentIndex >= playlist.length) {

            currentIndex = 0;

        }

        loadMedia(currentIndex);

        videoPlayer.play();

    }

});

function formatTime(seconds) {

    if (isNaN(seconds)) return "00:00";

    const minutes = Math.floor(seconds / 60);

    const remain = Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remain).padStart(2, "0")
    );

}


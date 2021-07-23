const player = document.querySelector('.player');
const video = player.querySelector('video');
const control = player.querySelector('.player__controls')
const playBtn = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('input');
const progressBar = player.querySelector('.progress');
const progressFilled = progressBar.querySelector('.progress__filled');
function togglePlay() {
  video.paused ? video.play() : video.pause();
};

function updateBtn(){
  if(video.paused){
    playBtn.innerText = '►';
  } else {
    playBtn.innerText = '❚ ❚';
  }
};

function skip(){
  video.currentTime += parseInt(this.dataset.skip);
};

function rangeUpdate() {
  video[this.name] = this.value;
};

function progress() {
  const videoPercent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${videoPercent}%`;
};

function scrub(e) {
  const time = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = time;
};


video.addEventListener('click',togglePlay);
playBtn.addEventListener('click',togglePlay);
video.addEventListener('pause', updateBtn);
video.addEventListener('play', updateBtn);
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
})
ranges.forEach(range => {
  range.addEventListener('change', rangeUpdate);
  range.addEventListener('mousemove', rangeUpdate);
})
video.addEventListener('timeupdate', progress);

let mouseDown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => {
  if(mouseDown){
    scrub(e);
  } else {
    return;
  }
});

progressBar.addEventListener('mousedown', () => mouseDown = true);
progressBar.addEventListener('mouseup', () => mouseDown = false);



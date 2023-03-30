import playPauseButton from "./nuts-and-bolts/play-pause";

function checkForWebAudio() {
  let hasWebAudio = !!window.AudioContext;

  let message = `WebAudio status: ${hasWebAudio ? "GOOD" : "BAD"}`;

  let messageContainer = document.createElement("p");
  messageContainer.innerText = message;
  document.body.appendChild(messageContainer);
}

const audioContext = new AudioContext();

let loopStarted = 0;
let timePassed = 0;
const bpm = 90;
const bps = bpm / 60;
const notesPerBeat = 4;
const beatLength = 1/bps;

function frame() {
  timePassed = audioContext.currentTime - loopStarted;
}

function loop() {
  requestAnimationFrame(loop);
  frame();
}

const printState = () => {
  console.log('timePassed', timePassed);
  console.log('loopStarted', loopStarted);
  console.log(audioContext.state);
  console.log('beatLength', beatLength);
}

const onPlay = () => {
  audioContext.resume();
  printState();
}

const onPause = () => {
  audioContext.suspend();
  printState();
}

function init() {
  checkForWebAudio(); // You can delete this after you've checked that WebAudio is ok.
  playPauseButton(onPlay, onPause);
  printState();
}

window.ac = audioContext;

init();
loop();

import playPauseButton from "./nuts-and-bolts/play-pause";
import SimpleSynth from "./nuts-and-bolts/simple-synth";
import bpmInput from "./nuts-and-bolts/bpm-input";

function checkForWebAudio() {
  let hasWebAudio = !!window.AudioContext;

  let message = `WebAudio status: ${hasWebAudio ? "GOOD" : "BAD"}`;

  let messageContainer = document.createElement("p");
  messageContainer.innerText = message;
  document.body.appendChild(messageContainer);
}

const audioContext = new AudioContext();
window.audioContext = audioContext;
const synth = new SimpleSynth(audioContext);
window.synth = synth;

let loopStarted = 0;
let timePassed = 0;
let bpm = 120;

const getBps = () => bpm / 60;
const numberOfNotesPerBeat = 4;
const getBeatLength = () => 1/getBps();
const getNoteLength = () => getBeatLength()/numberOfNotesPerBeat;

let lastBeatPlayed = 0;

function frame() {
  timePassed = audioContext.currentTime - loopStarted;
  const beatNumber = Math.floor(timePassed / getNoteLength());

  if(lastBeatPlayed != beatNumber) {
    synth.play(69, audioContext.currentTime, 0.25);
    lastBeatPlayed = beatNumber;
  }
}

function loop() {
  requestAnimationFrame(loop);
  frame();
}

const printState = () => {
  console.log('timePassed', timePassed);
  console.log('loopStarted', loopStarted);
  console.log(audioContext.state);
  console.log('beatLength', getBeatLength());
  console.log('noteLength', getNoteLength());
  console.log('bps', getBps());
  console.log('bpm', bpm);
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
  loopStarted = audioContext.currentTime;
  bpmInput(bpm, (x) => {
    bpm = x;
    printState();
  });

}

window.ac = audioContext;

init();
loop();

import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import fetchAudioBuffer from "@mohayonao/web-audio-utils/fetchAudioBuffer";
import createAudioBufferFromArray from "@mohayonao/web-audio-utils/createAudioBufferFromArray";

let amenBuffer = null;
let audioContext = getAudioContext();
let memo = [];

fetchAudioBuffer("amen.wav", audioContext).then((audioBuffer) => {
  amenBuffer = audioBuffer;
});

function play(impulseResponse) {
  let bufSrc = audioContext.createBufferSource();

  bufSrc.buffer = createAudioBufferFromArray(impulseResponse);

  bufSrc.start(audioContext.currentTime);
  bufSrc.stop(audioContext.currentTime + amenBuffer.duration);
  bufSrc.onended = () => {
    bufSrc.disconnect();
    memo.splice(memo.indexOf(bufSrc), 1);
  };
  memo.push(bufSrc);

  bufSrc.connect(audioContext.destination);
}

function apply(impulseResponse) {
  let bufSrc = audioContext.createBufferSource();
  let reverb = audioContext.createConvolver();

  bufSrc.buffer = amenBuffer;
  reverb.buffer = createAudioBufferFromArray(impulseResponse);

  bufSrc.start(audioContext.currentTime);
  bufSrc.stop(audioContext.currentTime + amenBuffer.duration);
  bufSrc.onended = () => {
    bufSrc.disconnect();
    memo.splice(memo.indexOf(bufSrc), 1);
  };
  memo.push(bufSrc);

  bufSrc.connect(reverb);
  reverb.connect(audioContext.destination);
}

export default {
  play(...args) {
    play(...args);
  },
  apply(...args) {
    apply(...args);
  },
};

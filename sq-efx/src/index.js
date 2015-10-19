import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import fetchAudioBuffer from "@mohayonao/web-audio-utils/fetchAudioBuffer";
import createAudioBufferFromArray from "@mohayonao/web-audio-utils/createAudioBufferFromArray";
import Vue from "vue";
import Sequencer from "./Sequencer";
import SQEfxNode from "./SQEfxNode";
import RelayNode from "./RelayNode";
import reverbList from "./reverbList";
import _sample from "lodash.sample";

window.addEventListener("DOMContentLoaded", () => {
  let audioContext= getAudioContext();
  let efxNode = new SQEfxNode(audioContext);
  let sequencer = new Sequencer();
  let relayBuffers = [];

  let vue = new Vue({
    el: "#app",
    data: {
      isReady: false,
      isPlaying: false
    },
    methods: {
      onClick() {
        if (!this.isReady) {
          return;
        }
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
          sequencer.start();
        } else {
          sequencer.stop();
        }
      }
    }
  });

  let reverbName = "cosmic-ping-longdrive.wav";

  Promise.all([
    fetchAudioBuffer("./assets/80ms.wav", audioContext).then((audioBuffer) => {
      relayBuffers[0] = audioBuffer;
    }),
    fetchAudioBuffer("./assets/90ms.wav", audioContext).then((audioBuffer) => {
      relayBuffers[1] = audioBuffer;
    }),
    fetchAudioBuffer("./assets/110ms.wav", audioContext).then((audioBuffer) => {
      relayBuffers[2] = audioBuffer;
    }),
    fetchAudioBuffer("./assets/reverb/" + reverbName, audioContext).then((audioBuffer) => {
      efxNode.setAudioBuffer(audioBuffer);
      console.log(reverbName);
    }),
  ]).then(() => {
    vue.isReady = true;
  });

  let count = 0;
  let phase = 0;

  sequencer.onbang = () => {
    if (true && Math.random() < phase) {
      let relay = new RelayNode(audioContext);

      relay.setAudioBuffer(_sample(relayBuffers));
      relay.start(audioContext.currentTime);

      relay.connect(efxNode);
    }
  };


  setInterval(() => {
    count += 1;
    if (256 <= count) {
      count = 0;
    }
    phase = count / 256;
    efxNode.setEfxLevel(phase);
  }, 250);

  efxNode.connect(audioContext.destination);
});

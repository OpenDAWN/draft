import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import viewer from "./viewer";
import player from "./player";
import gens from "./gens";

if (typeof global.window !== "undefined") {
  global.window.module = {};
}

global.onload = () => {
  let audioContext = getAudioContext();
  let amenBuffer = null;

  function fetchSourceCode(name) {
    return fetch(`gens/${name}.js`).then((res) => {
      return res.text();
    }).then((text) => {
      return eval.call(null, text);
    });
  }

  new Vue({
    el: "#app",
    data: {
      gens,
      selectedGen: gens[0] || "",
      code: "",
      impulseResponse: new Float32Array(0),
    },
    methods: {
      update() {
        return fetch(`gens/${this.selectedGen}.js`).then((res) => {
          return res.text();
        }).then((text) => {
          this.code = text;

          return eval.call(null, text);
        }).then((func) => {
          setTimeout(() => {
            this.impulseResponse = func(audioContext.sampleRate);
            viewer.draw(this.impulseResponse);
          }, 0);
        });
      },
      play() {
        player.play(this.impulseResponse);
      },
      apply() {
        player.apply(this.impulseResponse);
      },
      onChange() {
        this.update();
      }
    },
  }).update();
};

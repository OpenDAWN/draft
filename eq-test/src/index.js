import Vue from "vue";
import Player from "./Player";
import Parameter from "./Parameter";

window.addEventListener("DOMContentLoaded", () => {
  let player = new Player();

  Parameter.getInstance().on("update", ({ values }) => {
    let params = [];

    for (let i = 0, j = 0; i < 8; i++) {
      params.push([ values[j++], values[j++], values[j++] ]);
    }

    app.params = params;
  });

  let app = new Vue({
    el: "#app",
    data: {
      state: "ready",
      params: [],
    },
    methods: {
      onClick() {
        if (this.state === "suspended") {
          player.start();
          this.state = "playing";
        } else if (this.state === "playing") {
          player.stop();
          this.state = "suspended";
        }
      }
    },
  });

  player.on("ready", () => {
    app.state = "suspended";
  });
});

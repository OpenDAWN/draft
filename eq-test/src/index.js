import Vue from "vue";
import Player from "./Player";

window.addEventListener("DOMContentLoaded", () => {
  let player = new Player();

  let app = new Vue({
    el: "#app",
    data: {
      state: "ready",
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

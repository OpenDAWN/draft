import Player from "./Player";

window.onload = () => {
  let player = Player.getInstance();

  let app = new Vue({
    el: "#app",
    data: {
      isReady: false,
      isPlaying: false,
    },
    methods: {
      onClick() {
        if (!this.isReady) {
          return;
        }
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
          player.start();
        } else {
          player.stop();
        }
      },
    }
  });

  player.on("ready", () => {
    app.isReady = true;
  });
};

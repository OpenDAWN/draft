import Player from "./Player";
import Patterns from "./Patterns";
import LocalStorage from "./LocalStorage";

global.onload = () => {
  let player = new Player();
  let app = new Vue({
    el: "#app",
    data: {
      selected: "",
      options: Patterns.map(({ name }) => name),
      desc: "",
    },
    methods: {
      onClick() {
        player.stop();

        if (this.selected) {
          let patterns = Patterns.filter(({ name }) => name === this.selected);

          if (patterns.length) {
            player.play(patterns[0]);
          }
        }
      },
      onChange() {
        if (this.selected) {
          let patterns = Patterns.filter(({ name }) => name === this.selected);

          if (patterns.length) {
            this.desc = patterns[0].desc;
          }

          LocalStorage.save({ selected: this.selected });
        }
      }
    },
  });

  app.selected = LocalStorage.load().selected || "";
  app.onChange();
};

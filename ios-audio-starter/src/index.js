import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";
import enableMobileAutoPlay from "@mohayonao/web-audio-utils/enableMobileAutoPlay";

global.onload = () => {
  let audioContext = getAudioContext();

  let app = new Vue({
    el: "#app",
    data: {
      state: "initialize",
    }
  });

  enableMobileAutoPlay(audioContext, () => {
    app.state = "play?";

    let osc = audioContext.createOscillator();
    let gain = audioContext.createGain();

    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 5);
    osc.connect(gain);

    gain.gain.value = 0.25;
    gain.connect(audioContext.destination);
  });
};

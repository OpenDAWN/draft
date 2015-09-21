import getAudioContext from "@mohayonao/web-audio-utils/getAudioContext";

let audioContext = getAudioContext();

function decodeAudioData(file, successCallback, errorCallback) {
  let reader = new FileReader();

  reader.onloadend = () => {
    audioContext.decodeAudioData(reader.result, successCallback, errorCallback);
  };

  reader.readAsArrayBuffer(file);
}

export default { decodeAudioData };

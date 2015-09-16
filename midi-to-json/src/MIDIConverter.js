import MIDIConverter from "midi-converter";

function convert(file, callback) {
  let reader = new FileReader();

  reader.onloadend = () => {
    callback(MIDIConverter.midiToJson(reader.result));
  };

  reader.readAsBinaryString(file);
}

export default { convert };

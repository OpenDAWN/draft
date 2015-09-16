const KEY = `${location.origin}/draft/midi-to-json/state`;

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

function load() {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

export default { save, load };

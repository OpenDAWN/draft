const KEY = "/unebi-sound-test/data";

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function load() {
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

export default { save, load };

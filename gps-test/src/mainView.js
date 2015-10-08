import { EventEmitter } from "events";
import locationFinder from "./locationFinder";

let mainView = new EventEmitter();

function toArray(list) {
  return Array.prototype.slice.call(list);
}　　

function display(id, vidisble) {
  global.document.getElementById(id).style.display = vidisble ? "block" : "none";
}

function textContent(id, value) {
  global.document.getElementById(id).textContent = value;
}

function selectApp(appName) {
  mainView.selectedApp = appName;
  mainView.emit("select", { appName });

  if (appName !== null) {
    textContent("logo", appName.toUpperCase());
    display("close", true);
  } else {
    textContent("logo", "ADSR");
    display("close", false);
  }
  display("selector", false);
}

mainView.selectedApp = null;

mainView.init = (config) => {
  toArray(global.document.querySelectorAll("#selector li")).forEach((elem) => {
    let appName = elem.getAttribute("value");

    elem.addEventListener("click", (e) => {
      e.stopPropagation();
      selectApp(appName);
    });
  });

  global.document.getElementById("close").addEventListener("click", (e) => {
    e.stopPropagation();
    selectApp(null);
  });

  global.document.getElementById("container").addEventListener("click", () => {
    if (mainView.selectedApp === null) {
      locationFinder.find(config.locations, config.accurate).then((name) => {
        if (name === null) {
          display("selector", true);
        } else {
          selectApp(appName);
        }
      });
    }
  });
}

export default mainView;

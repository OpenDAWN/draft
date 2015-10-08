import mainView from "./mainView";
import config from "./config";

global.addEventListener("DOMContentLoaded", () => {
  mainView.init(config);
});

mainView.on("select-app", (appName) => {
  console.log("select-app", appName);
});

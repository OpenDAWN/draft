var fs = require("fs");

var list1 = fs.readdirSync(__dirname + "/assets/reverb");
var list2 = fs.readdirSync(__dirname + "/assets/reverb/house-impulses").map(function(filename) {
  return "house-impulses/" + filename;
});

var list = [].concat(list1, list2).filter(function(filename) {
  return /\.wav/.test(filename);
}).sort();
console.log(list)

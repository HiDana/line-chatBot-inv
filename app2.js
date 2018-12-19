var mongoose = require("mongoose");
var request = require("request");
let User = require("./models/User");
let Order = require("./models/Order");
let ExInfo = require("./models/ExInfo");

mongoose.connect("mongodb://Dana:skaos53ka2@ds241059.mlab.com:41059/inv");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});

// save userInfo
var NewUser = new User({
  user_id: "Uefbd1dd6d4fe3e159fa89d398c2eb306",
  user_name: "Dana"
});

NewUser.save(function(error) {
  console.log("a person was saved!");
  if (error) {
    console.error(error);
  }
});

// // save ex_rate eveyday
// request("https://tw.rter.info/capi.php", function(error, res, body) {
//   new ExInfo({
//     data: res.body
//   }).save(function(error) {
//     console.log("new exInfo was saved!");
//     if (error) {
//       console.error(error);
//     }
//   });
// });

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var exInfoSchema = new Schema(
  {
    data: Array
  },
  {
    versionKey: false,
    timestamps: { createdAt: "ex_time" }
  }
);

var ExInfo = mongoose.model("ExInfo", exInfoSchema);

// make this available to our users in our Node applications
module.exports = ExInfo;

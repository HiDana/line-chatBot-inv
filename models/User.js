let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    user_id: String,
    user_name: String
  },
  {
    versionKey: false,
    timestamps: { createdAt: "join_time", updatedAt: "update_time" }
  }
);

let User = mongoose.model("User", userSchema);

// make this available to our users in our Node applications
module.exports = User;

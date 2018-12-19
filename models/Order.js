var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema(
  {
    order_id: String,
    init_yuan: String,
    buy_yuan: String,
    status: String,
    ex_rate: Number,
    amount: Number
  },
  {
    versionKey: false,
    timestamps: { createdAt: "order_time" }
  }
);

var Order = mongoose.model("Order", orderSchema);

// make this available to our users in our Node applications
module.exports = Order;

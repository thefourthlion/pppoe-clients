const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    username: { type: String, required: true },
    ip: { type: String, required: true },
    uptime: { type: String, required: true },
  });

  
  
const pppoeSchema = new mongoose.Schema(
  {
    label: { type: String, required: [true, "Please provide label"] },
    mikrotikName: {
      type: String,
      required: [true, "Please provide mikrotikName"],
    },
    clients: { type: [clientSchema], required: [true, "Please provide clients"] },
    timestamp: { type: String, required: [true, "Please provide timestamp"] },
  },
  { timestamps: true }
);
const pppoe = mongoose.model("pppoe", pppoeSchema);
module.exports = pppoe;

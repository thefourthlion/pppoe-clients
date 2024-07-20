const mongoose = require("mongoose");
const pppoeSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide name"] },
    ip: { type: String, required: [true, "Please provide ip"] },
    uptime: { type: String, required: [true, "Please provide uptime"] },
    timestamp: { type: String, required: [true, "Please provide timestamp"] },
  },
  { timestamps: true }
);
const pppoe = mongoose.model("pppoe", pppoeSchema);
module.exports = pppoe;

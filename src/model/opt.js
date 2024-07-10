const mongoose = require("mongoose");

const optSchema = new mongoose.Schema({
  code: { type: Number, required: true },
  phone: { type: String, required: true },
  expireAt: { type: Number, required: true },
  uses: { type: Number, default: 0 },
});

const otpModel = mongoose.model('Otp',optSchema)

module.exports = otpModel
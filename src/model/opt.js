const mongoose = require("mongoose");

const optSchema = new mongoose.Schema({
  code: { type: Nubmer, required: true },
  phone: { type: String, required: true },
  expireAt: { type: Nubmer, required: true },
  uses: { type: Nubmer, default: 0 },
});

const otpModel = mongoose.model('Otp',optSchema)

module.exports = otpModel
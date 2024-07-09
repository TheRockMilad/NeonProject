const controller = require("./../controller");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const request = require("request");

module.exports = new (class extends controller {
  async register(req, res) {
    let user = await this.User.findOne({ email: req.body.email });
    if (user) {
      return this.response({
        res,
        code: 400,
        message: "This user already registered",
      });
    }
    user = new this.User(
      _.pick(req.body, ["email", "password", "name", "family", "age"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    this.response({
      res,
      message: "Successfull registered",
      data: _.pick(user, ["_id", "email", "name", "family", "age"]),
    });
  }

  async login(req, res) {
    const user = await this.User.findOne({ email: req.body.email });
    if (!user) {
      return this.response({
        res,
        code: 400,
        message: "invalid Email or password",
      });
    }
    const decoded = await bcrypt.compare(req.body.password, user.password);
    if (!decoded) {
      return this.response({
        res,
        code: 400,
        message: "invalid Email or password",
      });
    }
    res.clearCookie("authToken");
    const token = await jwt.sign({ _id: user.id }, process.env.JWT, {
      expiresIn: "1h",
    });
    res.cookie("authToken", token, { maxAge: 3600000, httpOnly: true });
    this.response({
      res,
      code: 200,
      message: "Successfull logged in",
      data: { token },
    });
  }

  async sendOtp(req, res) {
    const { phone } = req.body;
    const code = Math.floor(Math.random() * 99999);
    try {
      request.post(
        {
          url: "http://ippanel.com/api/select",
          body: {
            op: "pattern",
            user: "u09192391145",
            pass: "Faraz@0012744387",
            fromNum: "3000505",
            toNum: phone,
            patternCode: "slnva3v5gablq3d",
            inputData: [{ "verification-code": code }],
          },
          json: true,
        },
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
            //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
            console.log(response.body);
          } else {
            console.log("whatever you want");
          }
        }
      );
      return res.json("OTP code sent successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
})();

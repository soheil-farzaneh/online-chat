const express = require("express");
const app = express();

class AuthController {
  login(req, res) {
    const { phone } = req.body;
  }
}

module.exports = {
  login,
  register,
};

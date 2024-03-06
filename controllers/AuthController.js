const express = require("express");
const app = express();

class AuthController {
  login(req, res) {
    const { phone } = req.body;
  }

  register(req, res) {}
}

module.exports = {
    login,
    register
}

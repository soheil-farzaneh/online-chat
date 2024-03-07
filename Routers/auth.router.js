const { Router } = require("express");
const { login } = require("../controllers/AuthController");
const router = Router();

router.use("/login", login);

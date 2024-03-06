const { register, login } = require("../controllers/AuthController");
const { Router } = riquire("express");
const router = Router();

router.post("/register", register);
router.post("/login", login);

module.exports = {
  allRouter: router,
};

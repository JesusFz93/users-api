const { Router } = require("express");

const { validarJWT } = require("../middlewares");

const { login_CT, renewToken_CT } = require("../controllers/auth.ctrl");

const router = Router();

router.post("/login", login_CT);

router.get("/login", validarJWT, renewToken_CT);

module.exports = router;

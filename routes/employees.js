const express = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { getEmployees } = require("../controllers/Users");

const router = express.Router();

router.get("/", validarJWT, getEmployees);

module.exports = router;

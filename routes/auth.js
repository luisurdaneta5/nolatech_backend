const express = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const {
    revalidarToken,
    loginUser,
    createUser,
} = require("../controllers/Auth");
const { check } = require("express-validator");
const { validFields } = require("../middlewares/validFields");

const router = express.Router();

router.post(
    "/login",
    [
        check("email", "Email es requerido").isEmail(),
        check("password", "Contraseña es requerida").not().isEmpty(),
        validFields,
    ],
    loginUser
);

router.post(
    "/register",
    [
        check("name", "Nombre es requerido").not().isEmpty(),
        check("email", "Email es requerido").isEmail(),
        check("password", "Contraseña es requerida").not().isEmpty(),
        check("role", "Rol es requerido").not().isEmpty(),
        validFields,
    ],
    createUser
);

router.get("/renew", validarJWT, revalidarToken);

module.exports = router;

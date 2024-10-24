const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid, name, email, role } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = uid;
        req.name = name;
        req.email = email;
        req.role = role;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido",
        });
    }
    next();
};

module.exports = {
    validarJWT,
};

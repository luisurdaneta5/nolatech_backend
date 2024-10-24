const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Ya existe un usuario con ese correo",
            });
        }

        user = new User(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            msg: "Usuario Registrado",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe",
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Credenciales incorrectas",
            });
        }

        const token = await generarJWT(
            user.id,
            user.name,
            user.email,
            user.role
        );

        res.json({
            ok: true,
            msg: "Login correcto",
            uid: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const revalidarToken = async (req, res = response) => {
    const { uid, role, email, name } = req;

    const token = await generarJWT(uid, name, email, role);

    res.json({
        ok: true,
        uid,
        name,
        email,
        role,
        token,
    });
};
module.exports = {
    createUser,
    loginUser,
    revalidarToken,
};

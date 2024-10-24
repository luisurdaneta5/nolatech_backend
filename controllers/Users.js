const { response } = require("express");
const User = require("../models/User");

const getEmployees = async (req, res = response) => {
    try {
        const employees = await User.find({ role: "3" });
        res.json({
            ok: true,
            employees,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

module.exports = {
    getEmployees,
};

const express = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const {
    getEvaluations,
    createEvaluation,
    updateEvaluation,
    getEvaluation,
} = require("../controllers/Evaluations");

const router = express.Router();

router.get("/", validarJWT, getEvaluations);

router.post("/", validarJWT, createEvaluation);

router.put("/:id", validarJWT, updateEvaluation);

router.get("/:id", validarJWT, getEvaluation);
// router.get("/evaluations/employee/:id", validarJWT, getEvaluation);

module.exports = router;

const { response } = require("express");
const Evaluation = require("../models/Evaluation");

const getEvaluations = async (req, res = response) => {
    try {
        const evaluations = await Evaluation.find();
        res.json({
            ok: true,
            evaluations,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const getEvaluation = async (req, res = response) => {
    const evaluationId = req.params.id;

    try {
        const evaluation = await Evaluation.findById(evaluationId);

        if (!evaluation) {
            return res.status(404).json({
                ok: false,
                msg: "Evaluation not found",
            });
        }

        res.json({
            ok: true,
            evaluation,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const createEvaluation = async (req, res = response) => {
    try {
        const evaluation = new Evaluation(req.body);

        await evaluation.save();

        res.json({
            ok: true,
            msg: "Evaluación creada",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const updateEvaluation = async (req, res = response) => {
    const evaluationId = req.params.id;
    console.log(evaluationId);
    console.log(req.body);
    try {
        const evaluation = await Evaluation.findById(evaluationId);

        if (!evaluation) {
            return res.status(404).json({
                ok: false,
                msg: "Evaluation not found",
            });
        }

        const newEvaluation = {
            ...req.body,
        };

        await Evaluation.findByIdAndUpdate(evaluationId, newEvaluation, {
            new: true,
        });

        res.json({
            ok: true,
            msg: "Evaluación actualizada",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

const getEvaluationEmployee = async (req, res = response) => {
    const evaluationId = req.params.id;
    try {
        const evaluation = await Evaluation.findById();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador",
        });
    }
};

module.exports = {
    getEvaluations,
    getEvaluation,
    updateEvaluation,
    getEvaluationEmployee,
    createEvaluation,
};

const { Schema, model, Types } = require("mongoose");

const EvaluationSchema = Schema({
    name: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
    },
    questions: {
        type: Array,
    },
    answers: {
        type: Array,
    },
    // sender: {
    //     type: Types.ObjectId,
    // },
    // recipient: {
    //     type: Types.ObjectId,
    // },
});

module.exports = model("Evaluation", EvaluationSchema);

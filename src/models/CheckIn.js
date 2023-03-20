import { Schema, model } from "mongoose";

const checkInSchema = new Schema({
    IdEmpleado: {
        type: Number,
        required: true
    },
    Fecha: {
        type: String,
        required: true
    },
    Hora: {
        type: String,
        required: true
    },
    Tipo: {
        type: String,
        required: true
    },
}, {
    versionKey: false,
    timestamps: false
});

export default model('CheckIn', checkInSchema);
import { Schema, model } from "mongoose";

export const ROLES = ["admin", "instructor", "limpieza", "mantenimiento", "usuario"];

const rolSchema = new Schema({
    IdRol: {
        type: Number,
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true
    },
    Menu: [{
        type: String,
        required: true
    }],
}, {
    versionKey: false,
    timestamps: true
});

export default model('Rol', rolSchema);
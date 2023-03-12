import { Schema, model } from "mongoose";

export const ROLES = ["admin", "instructor", "limpieza", "mantenimiento"];

const rolSchema = new Schema({
    IdRol: {
        type: Number,
        required: true,
        trim: true
    },
    Nombre: {
        type: String,
        required: true,
        trim: true
    },
    Descripcion: {
        type: String,
        required: true,
        trim: true
    },
    Menu: {
        type: String,
        required: true,
        trim: true
    },
}, {
    versionKey: false,
    timestamps: true
});

export default model('Rol', rolSchema);
import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const empleadoSchema = new Schema({
    IdEmpleado: {
        type: Number,
        required: true,
        trim: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Edad: {
        type: Number,
        required: true,
        trim: true
    },
    Rol: [{
        type: String,
        required: true
    }],
    Telefono: [{
        type: Number,
        required: true,
        trim: true
    }],
    Sueldo: {
        type: Number,
        required: true,
        trim: true
    },
    Turno: {
        type: String,
        required: true,
        trim: true
    },
    Correo: {
        type: String,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true
});

empleadoSchema.statics.encryptPassword = async (Password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(Password, salt);
}

empleadoSchema.statics.comparePassword = async (Password, recivedPassword) => {
    return await bcrypt.compare(Password, recivedPassword);
}

export default model('Empleado', empleadoSchema);
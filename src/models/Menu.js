import { Schema, model } from "mongoose";

const menuSchema = new Schema({
    IdMenu: {
        type: Number,
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Privilegios: [{
        type: String,
        required: true
    }]
}, {
    versionKey: false,
    timestamps: true
});

export default model('Menu', menuSchema);
import Empleado from "../models/Empleado";
import config from "../config";
import jwt from "jsonwebtoken";
import RolModel from "../models/Rol";

export const findAllEmpleado = async (req, res) => {
    const allEmpleado = await Empleado.find();
    res.json(allEmpleado);
}

export const findOneEmpleado = async (req, res) => {
    const EmpleadoIdEmpleado = await Empleado.find({ IdEmpleado: req.params.id });
    res.json(EmpleadoIdEmpleado);
}

export const createEmpleado = async (req, res) => {
    const newEmpleado = new Empleado({
        IdEmpleado: req.body.IdEmpleado,
        Nombre: req.body.Nombre,
        Edad: req.body.Edad,
        Rol: req.body.Rol,
        Telefono: req.body.Telefono,
        Sueldo: req.body.Sueldo,
        Turno: req.body.Turno,
        Correo: req.body.Correo,
        Password: req.body.Password
    });
    const empleadoSaved = await newEmpleado.save();
    res.json(empleadoSaved);
}

export const deleteEmpleado = async (req, res) => {
    const deletedEmpleado = await Empleado.deleteOne({ IdEmpleado: req.params.id });

    if (deletedEmpleado.deletedCount == 0) return res.json({ message: "Empleado Not Found" });

    res.json({
        message: 'Empleado were deleted succesfully'
    });
}

export const updateEmpleado = async (req, res) => {
    const updatedEmpleado = await Empleado.updateOne(
        { IdEmpleado: req.params.id },
        {
            Nombre: req.body.Nombre,
            Edad: req.body.Edad,
            Telefono: req.body.Telefono,
            Sueldo: req.body.Sueldo,
            Turno: req.body.Turno,
            Correo: req.body.Correo,
            Password: await Empleado.encryptPassword(req.body.Password)
        });

    console.log(updatedEmpleado);

    if (updatedEmpleado.modifiedCount == 0) return res.json({ message: "Empleado Not Found" });

    res.json({
        message: "Empleado was updated successfully"
    });
}

//Metodos de Validación
export const signUp = async (req, res) => {
    const { IdEmpleado, Nombre, Edad, Rol, Telefono, Sueldo, Turno, Correo, Password } = req.body;

    const newEmpleado = new Empleado({
        IdEmpleado,
        Nombre,
        Edad,
        Rol,
        Telefono,
        Sueldo,
        Turno,
        Correo,
        Password: await Empleado.encryptPassword(Password)
    });

    if (Rol) {
        const foundRoles = await RolModel.find({ Nombre: Rol });
        newEmpleado.Rol = foundRoles.map(rol => rol._id);
    } else {
        const rol = await RolModel.findOne({ Nombre: "usuario" });
        newEmpleado.Rol = rol._id;
    }

    const savedEmpelado = await newEmpleado.save();
    console.log(savedEmpelado);

    const token = jwt.sign({ id: savedEmpelado._id }, config.SECRET, {
        expiresIn: 43200 //12 hours
    });

    res.status(200).json({ token });
}
export const signin = async (req, res) => {
    const empleadoFound = await Empleado.findOne({ IdEmpleado: req.body.IdEmpleado }).populate("Rol");

    if (!empleadoFound) return res.status(400).json({ message: "Empleado not found" });

    const matchPassword = await Empleado.comparePassword(req.body.Password, empleadoFound.Password);

    if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid Password" });

    const token = jwt.sign({ id: empleadoFound._id }, config.SECRET, {
        expiresIn: 43200 //12 hours
    });

    res.json({ token });
}

export const verificarRol = async (req, res) => {
    const EmpleadoIdEmpleado = await Empleado.find({ IdEmpleado: req.params.IdEmpleado });
    res.json(EmpleadoIdEmpleado);
}
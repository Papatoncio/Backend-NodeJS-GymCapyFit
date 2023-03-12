import jwt from "jsonwebtoken";
import config from "../config";
import Empleado from "../models/Empleado";
import Rol from "../models/Rol";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        console.log(token);

        if (!token) return res.status(403).json({ message: "No token provided" });

        const decoded = jwt.verify(token, config.SECRET);
        req.IdEmpleado = decoded.id;

        const empleado = await Empleado.findById(req.IdEmpleado, { password: 0 });

        if (!empleado) return res.status(404).json({ message: "No empleado found" });

        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

export const isAdmin = async (req, res, next) => {
    const empleado = await Empleado.findById(req.IdEmpleado);
    const rol = await Rol.find({ Nombre: empleado.Rol });

    if (rol.Nombre === "admin") {
        next();
        return;
    }

    return res.status(403).json({ message: "Require Admin role" });
}
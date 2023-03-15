import { ROLES } from "../models/Rol";
import Empleado from "../models/Empleado";

export const checkDuplicatedId = async (req, res, next) => {
    const empleado = await Empleado.findOne({ IdEmpleado: req.body.IdEmpleado });

    if (empleado) return res.status(400).json({ message: "The empleado already exists" });

    next();
}

export const checkRolesExisted = async (req, res, next) => {
    if (req.body.Rol) {
        for (let i = 0; i < req.body.Rol.length; i++) {
            if (!ROLES.includes(req.body.Rol[i])) {
                return res.status(400).json({ message: "Role ${req.body.Rol[i]} does not exists" });
            }
        }
    }
    next();
}
import Rol from "../models/Rol";

export const findAllRol = async (req, res) => {
    const allRol = await Rol.find();
    res.json(allRol);
}

export const findOneRol = async (req, res) => {
    const oneRol = await Rol.find({ Nombre: req.params.id });
    res.json(oneRol);
}

export const createRol = async (req, res) => {
    const newRol = new Rol({
        Nombre: req.body.Nombre,
        Descripcion: req.body.Descripcion,
        Privilegios: req.body.Privilegios
    });
    const rolSaved = await newRol.save();
    res.json(rolSaved);
}

export const deleteRol = async (req, res) => {
    const deletedRol = await Rol.deleteOne({ Nombre: req.params.id });

    if (deletedRol.deletedCount == 0) return res.json({ message: "Rol Not Found" });

    res.json({
        message: 'Rol were deleted succesfully'
    });
}

export const updateRol = async (req, res) => {
    const updatedRol = await Rol.updateOne(
        { Nombre: req.params.id },
        {
            Descripcion: req.body.Descripcion,
            Privilegios: req.body.Privilegios
        });

    if (updatedRol.modifiedCount == 0) return res.json({ message: "Rol Not Found" });

    res.json({
        message: "Rol was updated successfully"
    });
}
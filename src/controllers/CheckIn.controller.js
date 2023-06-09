import CheckIn from "../models/CheckIn";

export const findAllCheckIn = async (req, res) => {
    const allCheckIn = await CheckIn.find();
    res.json(allCheckIn);
}

export const findOneCheckIn = async (req, res) => {
    const oneCheckIn = await CheckIn.find({ IdEmpleado: req.params.id });
    res.json(oneCheckIn);
}

export const createCheckIn = async (req, res) => {
    const newCheckIn = new CheckIn({
        IdEmpleado: req.body.IdEmpleado,
        Fecha: req.body.Fecha,
        Hora: req.body.Hora,
        Tipo: req.body.Tipo
    });
    const checkInSaved = await newCheckIn.save();
    res.json(checkInSaved);
}

export const deleteCheckIn = async (req, res) => {
    const deletedCheckIn = await CheckIn.deleteOne({ IdEmpleado: req.params.id });

    if (deletedCheckIn.deletedCount == 0) return res.json({ message: "CheckIn Not Found" });

    res.json({
        message: 'CheckIn were deleted succesfully'
    });
}

export const updateCheckIn = async (req, res) => {
    const updatedCheckIn = await CheckIn.updateOne(
        { IdEmpleado: req.params.id },
        {
            Fecha: req.body.Fecha,
            Hora: req.body.Hora,
            Tipo: req.body.Tipo
        });

    if (updatedCheckIn.modifiedCount == 0) return res.json({ message: "CheckIn Not Found" });

    res.json({
        message: "CheckIn was updated successfully"
    });
}

export const findChecksInDay = async (req, res) => {
    const checkIns = await CheckIn.count({ IdEmpleado: req.params.id, Fecha: req.params.fecha });

    if (!checkIns) {
        console.log("Encontrado")
    } else {
        console.log("Error");
    }

    res.json(checkIns);
}
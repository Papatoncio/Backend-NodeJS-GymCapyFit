import { Router } from "express";
import { verifySignup } from "../middlewares";


import * as empleadoController from "../controllers/Empleado.controller";

const router = Router();

router.get('/', empleadoController.findAllEmpleado);

router.get('/:id', empleadoController.findOneEmpleado);

router.post('/', empleadoController.createEmpleado);

router.delete('/:id', empleadoController.deleteEmpleado);

router.get('/IdEmpleado/:id', empleadoController.findEmpleadoIdEmpleado);

router.put('/:id', empleadoController.updateEmpleado);

router.post('/signup', [verifySignup.checkDuplicatedId, verifySignup.checkRolesExisted], empleadoController.signUp);

router.post('/signin', empleadoController.signin);

export default router
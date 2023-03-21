import { Router } from "express";
import { authJwt, verifySignup } from "../middlewares";


import * as empleadoController from "../controllers/Empleado.controller";

const router = Router();

router.get('/', empleadoController.findAllEmpleado);

router.get('/:id', empleadoController.findOneEmpleado);

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], empleadoController.createEmpleado);

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], empleadoController.deleteEmpleado);

router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], empleadoController.updateEmpleado);

router.post('/signup', [verifySignup.checkDuplicatedId, verifySignup.checkRolesExisted], empleadoController.signUp);

router.post('/signin', empleadoController.signin);

export default router
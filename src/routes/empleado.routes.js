import { Router } from "express";
import { authJwt, verifySignup } from "../middlewares";


import * as empleadoController from "../controllers/Empleado.controller";

const router = Router();

router.get('/', empleadoController.findAllEmpleado);

router.get('/:id', empleadoController.findOneEmpleado);

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], empleadoController.createEmpleado);

router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], empleadoController.deleteEmpleado);

router.get('/IdEmpleado/:id', empleadoController.findEmpleadoIdEmpleado);

router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], empleadoController.updateEmpleado);

router.post('/signup', [verifySignup.checkDuplicatedId, verifySignup.checkRolesExisted], empleadoController.signUp);

router.post('/signin', empleadoController.signin);

//Verificar Roles de Usuario con JWt
// router.post('/admin/IdEmpleado/:id', [authJwt.verifyToken, authJwt.isAdmin], empleadoController.verificarRol);
// router.post('/instructor/IdEmpleado/:id', [authJwt.verifyToken, authJwt.isInstructor], empleadoController.verificarRol);
// router.post('/mantenimiento/IdEmpleado/:id', [authJwt.verifyToken, authJwt.isMantenimiento], empleadoController.verificarRol);
// router.post('/limpieza/IdEmpleado/:id', [authJwt.verifyToken, authJwt.isLimpieza], empleadoController.verificarRol);
// router.post('/usuario/IdEmpleado/:id', [authJwt.verifyToken, authJwt.isUsuario], empleadoController.verificarRol);

export default router
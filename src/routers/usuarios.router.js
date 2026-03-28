import { Router } from 'express';
import * as usuariosController from '../controllers/usuarios.controller.js';
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

//rutas para CRUD de la tabla usuarios
router.get('/', verificarToken, usuariosController.getAll);
router.post('/', verificarToken, usuariosController.create);
router.delete('/:id',verificarToken, usuariosController.remove);
router.put('/:id',verificarToken, usuariosController.update);

export default router;
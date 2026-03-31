import { Router } from 'express';
import * as clientesController from '../controllers/clientes.controller.js';
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

//rutas para CRUD de la tabla clientes
router.get('/',verificarToken, clientesController.getAll);
router.post('/',verificarToken, clientesController.create);
router.delete('/:id',verificarToken, clientesController.remove);
router.put('/:id',verificarToken, clientesController.update);
router.get("/buscar", verificarToken, clientesController.buscarClientes);

export default router;
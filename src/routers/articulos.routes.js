import { Router } from 'express';
import * as articulosController from '../controllers/articulos.controller.js';
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

//rutas para CRUD de la tabla articulos
router.get('/',verificarToken, articulosController.getAll);
router.get("/buscar", verificarToken, articulosController.buscarArticulos);
router.get('/:id',verificarToken, articulosController.getById);
router.post('/',verificarToken, articulosController.create);
router.put('/:id',verificarToken, articulosController.update);
router.delete('/:id',verificarToken, articulosController.remove);


export default router;
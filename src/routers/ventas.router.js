import { Router } from 'express';
import * as ventasController from '../controllers/ventas.controller.js';
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

//rutas para la tabla usuarios
router.post("/", verificarToken, ventasController.crearVenta);
router.get("/por-fecha", verificarToken, ventasController.getVentasPorFecha);
router.get("/:id", verificarToken, ventasController.obtenerVentaPorId);
router.delete("/:id", verificarToken, ventasController.remove);

export default router;
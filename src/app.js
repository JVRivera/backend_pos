// 1. Importar módulos
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './config/prisma.js';
import articulosRoutes from './routers/articulos.routes.js';
import clientesRoutes from './routers/clientes.routes.js';
import usuariosRoutes from './routers/usuarios.router.js';
import authRoutes from "./routers/auth.routes.js";

//1. leer variables de entorno
dotenv.config();

// 2. Crear la app
const app = express();

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. Rutas de prueba
app.get('/', (req, res) => {
  res.send('Servidor POS funcionando 🚀');
});

//rutas para tabla de articulos
app.use('/api/articulos', articulosRoutes);
//rutas para tabla de clientes
app.use('/api/clientes', clientesRoutes);
//rutas para tabla de usuarios
app.use('/api/usuarios', usuariosRoutes);
//ruta para login
app.use("/api/auth", authRoutes);

//prueba de conexion que muestra los datos de la tabla articulos
app.get('/test-db', async (req, res) => {
  try {
    const articulos = await prisma.articulos.findMany();
    res.json(articulos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la BD');
  }
});

// 5. Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
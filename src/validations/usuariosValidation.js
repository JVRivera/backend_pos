import Joi from "joi";

// Validación para crear usuario
export const crearUsuarioSchema = Joi.object({
  nombre: Joi.string().max(100).required(),
  email: Joi.string().max(500).required(),
  rol: Joi.string().max(100).required(),
  password: Joi.string().required(),
})
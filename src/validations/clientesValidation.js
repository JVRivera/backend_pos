import Joi from "joi";

// Validación para crear cliente
export const crearClienteSchema = Joi.object({
  nombre: Joi.string().max(100).required(),
  direccion: Joi.string().max(500).required(),
  telefono: Joi.string().allow(''), 
  nit: Joi.string().max(50).required(),
})
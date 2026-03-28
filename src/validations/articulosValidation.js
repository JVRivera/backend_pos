import Joi from "joi";

// Validación para crear artículo
export const crearArticuloSchema = Joi.object({
  articulo: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().max(500).allow(""),
  existencia: Joi.number().integer().min(0).required(),
  precioventa: Joi.number().precision(2).min(0).required(),
  preciocosto: Joi.number().precision(2).min(0).required(),
}).custom((obj, helper) => {
  if (obj.precioventa < obj.preciocosto) {
    return helper.message("El precio de venta no puede ser menor al precio de costo");
  }
  return true;
});

// Validación para actualizar artículo (todos opcionales)
export const actualizarArticuloSchema = Joi.object({
  articulo: Joi.string().min(3).max(100).required(),
  descripcion: Joi.string().max(500).allow(""),
  existencia: Joi.number().integer().min(0),
  precioventa: Joi.number().precision(2).min(0),
  preciocosto: Joi.number().precision(2).min(0),
}).custom((obj, helper) => {
  if (obj.precioventa !== undefined && obj.preciocosto !== undefined && obj.precioventa < obj.preciocosto) {
    return helper.message("El precio de venta no puede ser menor al precio de costo");
  }
  return true;
});
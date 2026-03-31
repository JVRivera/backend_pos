import * as articulosService from '../services/articulos.service.js';
import { crearArticuloSchema, actualizarArticuloSchema } from "../validations/articulosValidation.js";

export const getAll = async (req, res) => {
  try {
    const data = await articulosService.getArticulos();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const data = await articulosService.getArticuloById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try { 
    // Validar body
    const { error, value } = crearArticuloSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errores: error.details.map(e => e.message) });
    }

    //continua si tiene datos validados
    const data = await articulosService.createArticulo(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    // Validar body
    const { error, value } = actualizarArticuloSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errores: error.details.map(e => e.message) });
    }

    //continua si tiene datos validados
    const data = await articulosService.updateArticulo(
      req.params.id,
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await articulosService.deleteArticulo(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const buscarArticulos = async (req, res) => {
  try {
    const { search } = req.query;

    const clientes = await articulosService.buscarArticulos(search);

    res.json(clientes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar articulos" });
  }
};
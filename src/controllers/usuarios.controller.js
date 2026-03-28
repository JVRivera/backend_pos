import * as usuariosService from '../services/usuarios.service.js';
import { crearUsuarioSchema } from "../validations/usuariosValidation.js";

export const getAll = async (req, res) => {
  try {
    const data = await usuariosService.getUsuarios();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try { 
    // Validar body
    const { error, value } = crearUsuarioSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errores: error.details.map(e => e.message) });
    }    

    //continua si tiene datos validados
    const data = await usuariosService.createUsuario(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try { 
    // Validar body
    const { error, value } = crearUsuarioSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errores: error.details.map(e => e.message) });
    }

    //continua si tiene datos validados
    const data = await usuariosService.updateUsuario(req.params.id,req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await usuariosService.deleteUsuario(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
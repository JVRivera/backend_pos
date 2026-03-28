import * as clientesService from '../services/clientes.service.js';
import { crearClienteSchema } from "../validations/clientesValidation.js";

export const getAll = async (req, res) => {
  try {
    const data = await clientesService.getClientes();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req, res) => {
  try { 
    // Validar body
    const { error, value } = crearClienteSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errores: error.details.map(e => e.message) });
    }

    //continua si tiene datos validados
    const data = await clientesService.createCliente(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const update = async (req, res) => {
  try { 
    // Validar body
    const { error, value } = crearClienteSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ errores: error.details.map(e => e.message) });
    }

    //continua si tiene datos validados
    const data = await clientesService.updateCliente(req.params.id,req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const remove = async (req, res) => {
  try {
    const data = await clientesService.deleteCliente(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
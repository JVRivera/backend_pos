import { loginService } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {

    const data = await loginService(req.body);

    res.json(data);

  } catch (error) {

    res.status(400).json({
      error: error.message
    });

  }
};
import { response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token)
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'
    });

  try {
    const user = jwt.verify(token, process.env.SECRET_JWT_SEED);
    res.locals = user;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }
};

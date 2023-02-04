import { response } from 'express';

export const handleErrorCatch = (res = response, error) => {
  console.log('error', error);
  res.status(500).json({
    ok: false,
    msg: 'Por favor hable con el administrador'
  });
};

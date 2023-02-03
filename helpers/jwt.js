import jwt from 'jsonwebtoken';

export const generateJWT = (uid, name) =>
  new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '2h'
      },
      (error, token) => {
        if (error) {
          console.log('error', error);
          reject('No se pudo generar el token');
        }
        resolve(token);
      }
    );
  });

import { Router } from 'express';
import { check } from 'express-validator';

import { createUser, login, revalidateJWT } from '../controllers/authController.js';
import { validateFields, validateJWT } from '../middlewares/index.js';

export const authRouter = Router();

authRouter.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
  ],
  login
);

authRouter.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').trim().notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validateFields
  ],
  createUser
);

authRouter.get('/renew', validateJWT, revalidateJWT);

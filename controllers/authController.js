import { response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

import { generateJWT, handleErrorCatch } from '../helpers/index.js';

export const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese email'
      });

    user = new User({ name, email, password });

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    const { id: uid } = await user.save();
    const token = await generateJWT(uid, name);

    res.status(201).json({
      ok: true,
      name,
      uid,
      token
    });
  } catch (error) {
    handleErrorCatch(res, error);
  }
};

export const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        ok: false,
        msg: 'No existe un usuario creado con ese email'
      });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ ok: false, msg: 'El password es incorrecto' });

    const { id: uid, name } = user;
    const token = await generateJWT(uid, name);

    res.status(201).json({
      ok: true,
      name,
      uid,
      token
    });
  } catch (error) {
    handleErrorCatch(res, error);
  }
};

export const revalidateJWT = async (req, res = response) => {
  try {
    const { uid, name } = res.locals;
    const token = await generateJWT(uid, name);

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    handleErrorCatch(res, error);
  }
};

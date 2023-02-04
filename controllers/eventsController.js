import { response } from 'express';

import Event from '../models/Event.js';

import { handleErrorCatch } from '../helpers/index.js';

export const getEvents = async (req, res = response) => {
  try {
    const user = res.locals.uid;
    const events = await Event.find({ user }).populate('user', 'name');

    res.json({
      ok: true,
      events
    });
  } catch (error) {
    handleErrorCatch(res, error);
  }
};

export const createEvent = async (req, res = response) => {
  try {
    const user = res.locals.uid;
    let event = new Event({ ...req.body, user });
    event = await event.save();

    res.json({
      ok: true,
      event
    });
  } catch (error) {
    handleErrorCatch(res, error);
  }
};

export const updateEvent = async (req, res = response) => {
  try {
    const _id = req.params.id;
    const user = res.locals.uid;
    const event = await Event.findOneAndUpdate({ user, _id }, req.body, { new: true });

    if (!event)
      return res.status(404).json({
        ok: false,
        msg: `El evento que intentas actualizar no existe - id: ${_id}`
      });

    res.json({
      ok: true,
      event
    });
  } catch (error) {
    handleErrorCatch(res, error);
  }
};

export const deleteEvent = async (req, res = response) => {
  try {
    const _id = req.params.id;
    const user = res.locals.uid;
    const event = await Event.findOneAndDelete({ user, _id });

    if (!event)
      return res.status(404).json({
        ok: false,
        msg: `El evento que intentas eliminar no existe - id: ${_id}`
      });

    res.json({ ok: true });
  } catch (error) {
    handleErrorCatch(res, error);
  }
};

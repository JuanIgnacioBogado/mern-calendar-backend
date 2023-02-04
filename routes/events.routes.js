import { Router } from 'express';
import { check } from 'express-validator';

import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventsController.js';
import { validateJWT, validateFields } from '../middlewares/index.js';
import { isDate } from '../helpers/index.js';

export const eventsRouter = Router();

eventsRouter.use(validateJWT);

eventsRouter
  .route('/')
  .get(getEvents)
  .post(
    [
      check('title', 'El título es obligatorio').trim().notEmpty(),
      check('start', 'La fecha de inicio es obligatoria').custom(isDate),
      check('end', 'La fecha de fin es obligatoria').custom(isDate),
      validateFields
    ],
    createEvent
  );

eventsRouter
  .route('/:id')
  .all([check('id', 'El id no es un MongoID válido').isMongoId(), validateFields])
  .put(
    [
      check('title', 'El título es obligatorio').trim().notEmpty(),
      check('start', 'La fecha de inicio es obligatoria').custom(isDate),
      check('end', 'La fecha de fin es obligatoria').custom(isDate),
      validateFields
    ],
    updateEvent
  )
  .delete(deleteEvent);

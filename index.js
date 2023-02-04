import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import './db.js';

import { authRouter, eventsRouter } from './routes/index.js';

const { PORT, FRONTEND, WHITE_LIST } = process.env;
const app = express();

const whiteList = WHITE_LIST?.split(',');
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.get('/', (_, res) => res.redirect(FRONTEND));
// auth
app.use('/api/auth', authRouter);
// events
app.use('/api/events', eventsRouter);

app.listen(PORT, () => console.log('Server on port:', PORT));

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import './db.js';

import { authRouter } from './routes/auth.routes.js';

const { PORT, FRONTEND } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (_, res) => res.redirect(FRONTEND));
// auth
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log('Server on port:', PORT));

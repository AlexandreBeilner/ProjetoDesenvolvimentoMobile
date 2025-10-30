import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', routes);

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'internal_error', details: err?.message });
});

export default app;

import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { routes } from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/organizations', routes.organizations);

async function start() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

start();

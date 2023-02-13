import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import games from './routes/games.router.js'
import clientes from './routes/clientes.router.js'

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())

app.use(games)
app.use(clientes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
import express from "express";
import cors from 'cors';
import {db} from "./database/db.js";
//import Routes from './routes/routes.js';

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

//app.use('/Route', Routes);

async function startServer() {
  try {
    await db.authenticate();
    console.log("Conexión exitosa");

    app.listen(3001, () => {
      console.log('Servidor en ejecución en http://localhost:3001/Route/');
    });
  } catch (error) {
    console.log(`El error de conexión es: ${error}`);
  }
}

startServer();
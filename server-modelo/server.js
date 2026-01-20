import express from 'express';
import cors from 'cors';  // Importa el paquete CORS
import dotenv from 'dotenv';  // Importa dotenv
import modelRoutes from './routes/router.js';
import connectToDatabase from './database/db.js';

import morgan from "morgan";
// Configuración de dotenv para leer variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  // Usa el puerto de la variable de entorno o 3000 por defecto

// Middleware para permitir CORS en todas las rutas
app.use(cors());  // Habilita CORS para todas las solicitudes entrantes

// Middleware para analizar cuerpos JSON en las solicitudes
app.use(express.json());  // Para manejar datos JSON en el cuerpo de la solicitud

// Middleware para servir archivos estáticos (si los necesitas)
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor funcionando en el puerto ' + PORT);
});

// Rutas del modelo
app.use('/api/model', modelRoutes);

// Conectar a la base de datos y mostrar un log cuando esté funcionando
connectToDatabase()
  .then(() => {
    console.log('MongoDB está corriendo correctamente');
  })
  .catch((err) => {
    console.error('Error al conectar a MongoDB:', err);
  });

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

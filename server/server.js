import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path from 'path';
import { __dirname } from "./helpers/ruta.js";
import compression from 'compression';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { clearDatabase } from "./config/db.js";

import uploadRoutes from './routes/subir_foto.js';
import authRoutes from './routes/authRoutes.js';
import noticiasRoutes from './routes/noticiasRoutes.js';

import cuentaRoutes from './routes/cuentaRoutes.js';
import passwordRecovery from './routes/passwordRecoveryRoutes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const TEST_PORT = process.env.TEST_PORT || 4001; // Puerto de prueba

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' })); // Límite de tamaño en express.json
app.use(express.urlencoded({ limit: '5mb', extended: true })); // Límite de tamaño en express.urlencoded
app.use(morgan('combined'));
app.use(compression());
app.use('/api/recovery', passwordRecovery);  
// Middleware para carga de archivos
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./tmp",
  limits: { fileSize: 8 * 1024 * 1024 },
}));

// Acceso a archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public'))); // Archivos estáticos de la carpeta 'public'
app.use('/foto_users', express.static(path.resolve('./uploads/foto_users'))); // Imágenes de perfil

// Configura las rutas de autenticación
app.use('/api/auth', authRoutes);
app.use('/api/noticia', noticiasRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', cuentaRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // clearDatabase();  // Llamar a la función para borrar los datos después de la conexión
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Salir en caso de error
  });

// Iniciar el servidor en el puerto de prueba si es necesario
const portToUse = process.env.NODE_ENV === 'test' ? TEST_PORT : PORT;
app.listen(portToUse, () => {
  console.log(`Server running on port ${portToUse}`);
});

export { app };

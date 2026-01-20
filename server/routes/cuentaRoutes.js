// import  Router  from 'express'
// import {obtenerCuentasDeUsuario, obtenerUsuariosDeCuenta, agregarCuentaAUsuario, obtenerUsuariosConCuentas, obtenerCuentasConUsuarios } from '../controllers/cuentaController.js'

// const router = Router()

// routes/userRoutes.js
import express from 'express';
import { addAccountToUser, getAccountsForUser, removeAccountFromUser } from '../controllers/cuentaController.js';

const router = express.Router();

// Ruta para añadir cuenta a un usuario
router.post('/user/:userId/cuenta', addAccountToUser);

// Ruta para obtener las cuentas de un usuario
router.get('/user/:userId/cuenta', getAccountsForUser);

// Ruta para quitar una cuenta asociada a un usuario
router.delete('/user/:userId/cuenta/:accountId', removeAccountFromUser);

export default router;


// router.get('/usuarios', obtenerUsuariosConCuentas);

// router.get('/cuentas', obtenerCuentasConUsuarios);

// //obtiene todas las cuentas de un usuario
// router.get('/cuentas/:id', obtenerCuentasDeUsuario);

// //obtiene todos los usuarios de una cuenta
// router.get('/usuarios/:id', obtenerUsuariosDeCuenta);

// router.post('/usuarios/:userId/cuentas', agregarCuentaAUsuario);

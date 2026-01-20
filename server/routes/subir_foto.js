import express from 'express';
import {uploadUserImage, updateUserProfile, eliminarFotoUser} from '../controllers/upload_controlers.js';

const router = express.Router();


router.put('/editar/:id', updateUserProfile)

router.put('/:id', uploadUserImage)

router.delete('/:id', eliminarFotoUser)

export default router;


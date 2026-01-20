import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';  
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Crear un transportador para Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Puedes usar otro servicio si lo deseas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Enviar el correo para la recuperación de la contraseña
router.post('/request', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'El correo electrónico no está registrado' });
    }

    // Generar un token JWT para la recuperación de la contraseña
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Crear el enlace de recuperación
    const resetLink = `http://${req.headers.host}/api/password-recovery/reset/${token}`;

    // Configuración del correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Recuperación de Contraseña',
      html: `<p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p><a href="${resetLink}">Restablecer Contraseña</a>`
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Correo de recuperación enviado' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Restablecer la contraseña
router.post('/reset/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    // Encriptar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: 'Contraseña restablecida exitosamente' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al restablecer la contraseña' });
  }
});

export default router;

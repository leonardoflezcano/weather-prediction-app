import User from '../models/UserModel.js'
import Cuenta from '../models/cuentaModel.js'
import {verifyToken} from "../helpers/jsonWebToken.js"
// import {comparePassword, hashPassword} from "../helpers/bycript.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Función para asociar un usuario con una cuenta
async function asociarUsuarioConCuenta(userId, cuentaId) {
  // Añade la cuenta al usuario
  await User.findByIdAndUpdate(userId, { $addToSet: { cuentas: cuentaId } });

  // Añade el usuario a la cuenta
  await Cuenta.findByIdAndUpdate(cuentaId, { $addToSet: { usuarios: userId } });
}

// Controlador para obtener información del usuario por token
export const ctrlGetUserInfoByToken = async (req, res) => {
  const tokenHeader = req.headers["authorization"];
  console.log("tokenHeader: ", tokenHeader);

  try {
    if (!tokenHeader) {
      return res.status(401).json({ message: "No existe un token" });
    }

    // Extraer el token sin el prefijo "Bearer"
    const token = tokenHeader.replace("Bearer ", "");
    console.log("token recibido: ", token);

    try {
      // Decodificar el token
      const decodedToken = verifyToken(token);
      console.log("token decodificado: ", decodedToken);

      // Verifica que el token decodificado tiene un `id`
      if (!decodedToken || !decodedToken.userId) {
        return res.status(401).json({ message: "Token inválido: no se encontró el id de usuario" });
      }

      // Convertir el id a número (if needed)
      const userId = decodedToken.userId;
      console.log("userId decodificado: ", userId);

      // Buscar al usuario en la base de datos usando el userId decodificado
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Retornar la información del usuario
      res.status(200).json(user);
    } catch (error) {
      console.error("Error al verificar el token:", error.message);
      return res.status(401).json({ message: "Token inválido" });
    }
  } catch (outerError) {
    console.error("Error general:", outerError);
    res.status(500).json({ message: "Error interno del servidor", error: outerError.message });
  }
};

// Controlador para el registro de usuarios
export const register = async (req, res) => {
  const { nombre_completo, username, email, password, confirmPassword } = req.body;

  // Validar que todos los campos estén presentes
  if (!nombre_completo || !username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    console.log("contraseña a encriptar ", password)
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = new User({
      nombre_completo,
      username,
      email,
      password
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    // Crear una cuenta asociada al usuario
    const nuevaCuenta = new Cuenta({
      usuario: newUser._id
    });

    // Guardar la nueva cuenta
    await nuevaCuenta.save();

    // Asociar la cuenta al usuario
    newUser.cuentas.push(nuevaCuenta._id);
    await newUser.save();

    // Generar un token de autenticación
    console.log( process.env.JWT_SECRET)

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '200h' }
    );

    // Enviar el token y el ID del usuario en la respuesta
    res.status(201).json({ token, userId: newUser._id });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Controlador para el inicio de sesión de usuarios
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validar que todos los campos estén presentes
  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email }).populate('cuentas');
    if (!user) {
      return res.status(400).json({ error: 'Correo electrónico no encontrado' });
    }

    // Verificar si las contraseñas coinciden
    console.log('Contraseña proporcionada:', password);
    console.log('Contraseña almacenada (hashed):', user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Las contraseñas no coinciden');
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Verificar si el usuario tiene al menos una cuenta asociada
    if (user.cuentas.length === 0) {
      const nuevaCuenta = new Cuenta({ usuario: user._id });
      await nuevaCuenta.save();
      user.cuentas.push(nuevaCuenta._id);
      await user.save();
    }

    // Generar un token de autenticación
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '200h' }
    );

    // Enviar el token, el ID del usuario, y las cuentas asociadas en la respuesta
    res.status(200).json({ token, userId: user._id, cuentas: user.cuentas });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const Logeado = async (req, res) => {
  const { email, password } = req.body;

  // Validar que los campos estén presentes
  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Correo electrónico no encontrado' });
    }

    // Comparar la contraseña hasheada que se recibe con la almacenada en la base de datos
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un nuevo token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '200h' } // Ajusta el tiempo de expiración según lo necesites
    );

    // Enviar el token generado
    res.status(200).json({ token, userId: user._id });

  } catch (err) {
    console.error('Error al validar usuario:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
  try {
    const user = await User.findById(id); // Buscar el usuario por ID
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user); // Enviar los datos del usuario encontrado
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.status(200).json(users); // Enviar los datos de todos los usuarios
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
  const { nombre_completo, username, email, password } = req.body; // Obtener los nuevos datos del usuario

  try {
    const user = await User.findById(id); // Buscar el usuario por ID
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario si se proporcionan nuevos datos
    if (nombre_completo) user.nombre_completo = nombre_Completo;
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); // Encriptar nueva contraseña si es proporcionada

    await user.save(); // Guardar los cambios en la base de datos
    res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (err) {
    console.error('Error al actualizar el usuario:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }

  
};
// Forgot Password: Genera el token y envía un correo electrónico
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar un token de restablecimiento
    const token = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = token;
    user.passwordResetTokenExpiration = Date.now() + 3600000; // 1 hora
    await user.save();

    // Enviar correo electrónico
    const resetURL = `${req.protocol}://${req.get('host')}/api/users/reset-password/${token}`;
    await sendResetEmail(user.email, resetURL);

    res.status(200).json({ message: 'Correo enviado para restablecer la contraseña' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
};

// Función para enviar el correo de restablecimiento
const sendResetEmail = async (email, resetURL) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'your-email@live.com', 
      pass: 'your-email-password',  
    },
  });

  const mailOptions = {
    from: 'your-email@live.com', 
    to: email,                    
    subject: 'Restablecimiento de Contraseña', 
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetURL}`, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
  }
};

// **Función de "resetPassword"**
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({ passwordResetToken: token, passwordResetTokenExpiration: { $gt: Date.now() } });
    
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al restablecer la contraseña' });
  }
}
import User from '../models/UserModel.js';
import Cuenta from '../models/cuentaModel.js';
import bcrypt from "bcrypt"

// // Función para asociar un usuario con una cuenta
// async function asociarUsuarioConCuenta(userId, cuentaId) {
//   // Añade la cuenta al usuario
//   await User.findByIdAndUpdate(userId, { $addToSet: { cuentas: cuentaId } });

//   // Añade el usuario a la cuenta
//   await Cuenta.findByIdAndUpdate(cuentaId, { $addToSet: { usuarios: userId } });
// }

export const addAccountToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { email, password } = req.body;  // Extraemos email y password del body

    // Validar que los campos email y password estén presentes
    console.log("email", email)
    console.log("password", password)

    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, complete los campos de email y contraseña' });
    }

    // 1. Busca al usuario por correo electrónico
    const userAdd = await User.findOne({ email });
    if (!userAdd) {
      return res.status(404).json({ message: 'Correo no encontrado' });
    }

    // 2. Verifica que la contraseña sea correcta
    const isPasswordCorrect = await bcrypt.compare(password, userAdd.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // 3. Busca al usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // 4. Crear la nueva cuenta asociada al usuario
    const cuenta = new Cuenta({
      // usuario: userId, // Asociamos la cuenta al ID del usuario
      usuario: userAdd._id, 

    });

    // 5. Guardar la cuenta en la base de datos
    await cuenta.save();

    // 6. Asociar la nueva cuenta al array de cuentas del usuario
    user.cuentas.push(cuenta._id);
    await user.save();

    // 7. Enviar la respuesta con la cuenta creada
    res.status(201).json({ message: 'Cuenta creada y asociada al usuario', cuenta });
  } catch (error) {
    console.error('Error en la creación de la cuenta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const getAccountsForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extrae el userId de los parámetros
    const user = await User.findById(userId).populate('cuentas'); // Busca al usuario y popula las cuentas asociadas

    if (!user) {
      // Si no se encuentra al usuario, se lanza un error
      throw new Error('Usuario no encontrado');
    }

    // Si el usuario tiene cuentas asociadas, las devuelve
    if (user.cuentas.length === 0) {
      res.status(404).json({ message: 'No cuentas asociadas' });
    } else {
      res.status(200).json(user.cuentas); // Responde con las cuentas asociadas
    }
  } catch (error) {
    // Si hay un error, responde con un mensaje de error
    res.status(400).json({ error: error.message });
  }
};

export const removeAccountFromUser = async (req, res) => {
  try {
    const { userId, accountId } = req.params; // ID del usuario y de la cuenta a eliminar

    // 1. Buscar al usuario por su ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 2. Verificar si la cuenta está asociada al usuario
    if (!user.cuentas.includes(accountId)) {
      return res.status(400).json({ error: 'La cuenta no está asociada a este usuario' });
    }

    // 3. Eliminar la cuenta del array de cuentas del usuario
    user.cuentas = user.cuentas.filter(cuenta => cuenta.toString() !== accountId);
    await user.save();

    // 4. Eliminar la cuenta de la base de datos
    await Cuenta.findByIdAndDelete(accountId);

    // 5. Enviar una respuesta de éxito
    res.status(200).json({ message: 'Cuenta eliminada y disociada del usuario' });
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// export const obtenerUsuariosConCuentas = async (req, res) => {
//   try {
//     const usuarios = await User.find().populate('cuentas');
//     res.status(200).json(usuarios);
//   } catch (error) {
//     console.error('Error al obtener usuarios con cuentas:', error);
//     res.status(500).json({ error: 'Error del servidor' });
//   }
// };

// // Función para obtener usuarios de una cuenta
// export async function obtenerUsuariosDeCuenta(req, res) {
//   const { id } = req.params;
//   try {
//     const cuenta = await Cuenta.findById(id).populate('usuarios');
//     if (!cuenta) {
//       return res.status(404).json({ message: 'Cuenta no encontrada' });
//     }
//     res.json(cuenta.usuarios);
//   } catch (error) {
//     res.status(500).json({ message: 'Error al obtener los usuarios de la cuenta', error });
//   }
// }

// // Función para agregar una cuenta a un usuario
// export async function agregarCuentaAUsuario(req, res) {
//   const { email, password, nombre_cuenta } = req.body;

//   try {
//     // 1. Busca al usuario por correo electrónico
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'Correo no encontrado' });
//     }

//     // 2. Verifica que la contraseña sea correcta
//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: 'Contraseña incorrecta' });
//     }

//     // 3. Crea una nueva cuenta
//     const nuevaCuenta = new Cuenta({ nombre_cuenta });

//     // 4. Intenta guardar la cuenta y asociarla al usuario
//     await nuevaCuenta.save();

//     // 5. Agrega la referencia de la cuenta al usuario
//     user.cuentas.push(nuevaCuenta._id);
//     await user.save();

//     // 6. Agrega la referencia del usuario a la cuenta
//     nuevaCuenta.usuarios.push(user._id);
//     await nuevaCuenta.save();

//     res.status(201).json({ message: 'Cuenta creada y agregada al usuario', nuevaCuenta });
//   } catch (error) {
//     console.error('Error al agregar la cuenta al usuario:', error); // Log completo del error
//     res.status(500).json({ message: 'Error al agregar la cuenta al usuario', error: error.message });
//   }
// }

// export const obtenerCuentasConUsuarios = async (req, res) => {
//   try {
//     const cuentas = await Cuenta.find().populate('usuarios');
//     res.status(200).json(cuentas);
//   } catch (error) {
//     console.error('Error al obtener cuentas con usuarios:', error);
//     res.status(500).json({ error: 'Error del servidor' });
//   }
// };

// // Función para obtener cuentas de un usuario
// export async function obtenerCuentasDeUsuario(req, res) {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id).populate({
//       path: 'cuentas',
//       model: 'Cuenta',
//       populate: {
//         path: 'usuarios', // Poblamos el campo 'usuarios' dentro de cada cuenta
//         model: 'User', // Referenciamos el modelo 'User'
        
//       },
//     }).lean(); // Usar lean para obtener un objeto JSON sin métodos adicionales

//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }

//     res.json(user.cuentas); // Retorna todas las cuentas con detalles completos de los usuarios
//   } catch (error) {
//     console.error('Error al obtener las cuentas del usuario:', error);
//     res.status(500).json({ message: 'Error al obtener las cuentas del usuario', error });
//   }
// }

// models/Cuenta.js
import mongoose from 'mongoose';

const CuentaSchema = new mongoose.Schema({
  // Asociación no requerida con usuarios
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo User
    required: true, // Aseguramos que cada cuenta pertenezca a un único usuario
  },
});

const Cuenta = mongoose.model('Cuenta', CuentaSchema);

export default Cuenta;

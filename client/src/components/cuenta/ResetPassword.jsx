import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/reset-password/${token}`, { newPassword: password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.error || 'Error al restablecer la contraseña.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white">
      <div className="w-[20rem] bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-center text-blue-700">Restablecer Contraseña</h2>
          <p className="text-center text-purple-600 text-sm">
            Ingrese su nueva contraseña para continuar
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
            >
              Actualizar Contraseña
            </button>
          </form>
        </div>
        <div>
          {message && (
            <p className="w-full text-center text-sm text-purple-700 bg-purple-100 p-3 rounded-lg">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

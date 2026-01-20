import React, { useState } from 'react';
import axios from '../api/axiosInstance'; // Asegúrate de tener la instancia de axios configurada correctamente

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Enviar el correo al servidor para generar un token de recuperación
      const response = await axios.post('http://localhost:4000/api/recovery/request', { email });

      // Mensaje de éxito
      setMessage(response.data.message);
    } catch (error) {
      // Mensaje de error si algo falla
      setMessage(error.response?.data.error || 'Error al enviar el correo. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-white">
      <div className="w-[20rem] bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-center text-blue-700">Recuperar Contraseña</h2>
          <p className="text-center text-purple-600 text-sm">
            Ingrese su correo electrónico para recibir instrucciones.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
            >
              {isLoading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>

        {/* Mostrar mensaje después de intentar enviar el correo */}
        <div>
          {message && (
            <p className="w-full text-center text-sm text-purple-700 bg-purple-100 p-3 rounded-lg mt-4">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

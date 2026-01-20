import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import Swal from 'sweetalert2';
import contactoImage from '../../../src/images2/login_img3.jpg';
import '../../../src/stilos/login.css';

export function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el id desde la URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Si el id está presente, agregar cuenta sin iniciar sesión
        await axios.post(`/user/${id}/cuenta`, {
          email: formData.correo,
          password: formData.password,
        });

        // SweetAlert para cuenta agregada exitosamente
        Swal.fire({
          icon: 'success',
          title: 'Cuenta agregada exitosamente',
          text: 'Se ha agregado la cuenta al usuario.',
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirigir a otra página (ej. perfil o página de usuario)
        setTimeout(() => {
          navigate(`/cambiar_cuenta/${id}`); // Ajusta la ruta según tu aplicación
        }, 2000);

      } else {
        // Si no tiene id, proceder con el inicio de sesión normal
        const response = await axios.post('/auth/login', {
          email: formData.correo,
          password: formData.password,
        });

        // Guardar token en el almacenamiento local
        localStorage.setItem('token', response.data.token);

        // SweetAlert para inicio de sesión exitoso
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Serás redirigido a la página de estaciones.',
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirigir al mapa
        setTimeout(() => {
          navigate('/modelo_prediccion');
        }, 2000);
      }

    } catch (error) {
      console.error('Error en el inicio de sesión:', error);

      // SweetAlert para error en el login
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data.error || 'Error al iniciar sesión. Intente nuevamente.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="login-background">
      <div className="flex items-center justify-center min-h-screen bg-gray-1000 p-4" >
        <div className="bg-white shadow-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8" id="contenedor-login">
          <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg">
            <img src={contactoImage} alt="Edit Profile" className="w-full h-full object-cover rounded-lg" />
          </div>

          <div className="space-y-6 border-2 border-gray-300 rounded-lg p-4">
            <div className="text-center space-y-4 contactanos">
              <h2 className="text-3xl md:text-3xl font-bold">Inicia sesión</h2>
              <p className="login-subtitulo">Logeate para acceder a más funcionalidades</p>
            </div>
            <main>
              <form onSubmit={handleSubmit} className="login-form">
                <div className="space-y-4">
                  <div className="relative">
                    <FaEnvelope className="absolute top-1 left-2 text-gray-500" />
                    <label htmlFor="correo" className="block text-sm font-medium text-gray-700 ml-7">
                      Correo electrónico
                    </label>
                    <input
                      id="correo"
                      type="email"
                      placeholder="Ingrese su correo"
                      value={formData.correo}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                      required
                    />
                  </div>
                  <div className="relative">
                    <FaLock className="absolute top-1 left-2 text-gray-500" />
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-7">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Ingrese su contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <div className="remember-me">
                      <input id="remember" type="checkbox" className="checkbox" />
                      <label htmlFor="remember" className="checkbox-label">Recordarme</label>
                    </div>
                    <Link to="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</Link>
                  </div>

                  <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </button>
                </div>
              </form>
            </main>
            <footer className="login-footer">
              <p className="signup-text">
                ¿No tienes una cuenta?{' '}
                <Link to="/registro" className="signup-link">
                  Regístrate
                </Link>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

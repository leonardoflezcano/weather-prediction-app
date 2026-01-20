import React, { useState } from 'react';
import axios from '../../api/axiosInstance';
import { FaEnvelope, FaTag, FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../stilos/register.css';
import contactoImage from '../../../src/images2/register_2.jpg';

export function Register() {
    const [formData, setFormData] = useState({
        nombre_completo: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { nombre_completo, username, email, password, confirmPassword } = formData;
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar si las contraseñas coinciden
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
            });
            return;
        }

        try {
            // Enviar los datos del formulario al backend
            await axios.post('/auth/register', formData);
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Usuario registrado con éxito',
            });
            
            // Limpiar el formulario
            setFormData({
                nombre_completo: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            });

            // Redirigir al login después del registro exitoso
            navigate('/cuenta'); // Ruta para el componente LoginPage
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.response?.data?.message || 'Error al registrar',
            });
        }
    };

    return (
        <div className="contenedor-backgraound-register">
            <div className="flex items-center justify-center min-h-screen bg-gray-1000 p-4">
                <div className="bg-white shadow-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8" id="contenedor-registro"> 
                    <div className="flex items-center justify-center border-2 border-gray-300 rounded-lg">
                        <img
                            src={contactoImage}
                            alt="Imagen de contacto"
                            className="w-full h-full object-cover rounded-lg"
                            style={{ aspectRatio: "600/600", objectFit: "cover" }}
                        />
                    </div>

                    <div className="space-y-5 border-2 border-gray-300 rounded-lg p-4">
                        <div className="text-center space-y-4 contactanos">
                            <h2 className="text-3xl md:text-3xl font-bold">Crear cuenta</h2>
                            <p className="text-gray-600 mt-1">Regístrate para obtener una cuenta</p>
                        </div>
                        <main>
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <FaUser className="absolute top-1 left-2 text-gray-500" />
                                        <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700 ml-7">Nombre completo</label>
                                        <input
                                            id="nombre_completo"
                                            name="nombre_completo"
                                            placeholder="Ingrese su nombre completo"
                                            value={formData.nombre_completo}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <FaTag className="absolute top-1 left-2 text-gray-500" />
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 ml-7">Username</label>
                                        <input
                                            id="username"
                                            name="username"
                                            placeholder="Ingrese su nombre de usuario"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <FaEnvelope className="absolute top-1 left-2 text-gray-500" />
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-7">Correo electrónico</label>
                                        <input
                                            id="email"
                                            name="email"
                                            placeholder="Ingrese su correo"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                            required
                                        />
                                    </div>
                                    <div className="relative">
                                        <FaLock className="absolute top-1 left-2 text-gray-500" />
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-7">Contraseña</label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Ingrese su contraseña"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                            required
                                        />
                                    </div>

                                    <div className="relative">
                                        <FaLock className="absolute top-1 left-2 text-gray-500" />
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 ml-7">Confirmar contraseña</label>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirme su contraseña"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input id="terms" type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" required />
                                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">Acepto los términos y condiciones</label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-2 rounded-md mt-4"
                                >
                                    Registrarse
                                </button>
                                <p className="mt-4 text-center text-sm text-gray-600">
                                    ¿Ya tienes una cuenta? <Link to="/cuenta" className="text-primary hover:underline">Iniciar sesión</Link>
                                </p>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

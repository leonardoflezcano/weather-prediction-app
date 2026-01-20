import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaSignOutAlt } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { fetchUserInfo } from "../Function/infoToken";
import Swal from 'sweetalert2';
import "../../stilos/perfil.css";
import { useTheme } from '../../contex/themaContext';  // Importa el hook useTheme

export default function Cambiar_cuenta() {
  const [userInfo, setUserInfo] = useState(null);
  const [cuentas, setCuentas] = useState([]);
  const { id } = useParams();
  const { theme } = useTheme();  // Obtén el tema actual

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token)
        .then(data => setUserInfo(data))
        .catch(error => console.error("Error al obtener la información del usuario:", error));
    }
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/user/${id}/cuenta`)
      .then(res => res.json())
      .then(data => {
        const usuarios = data
          .map(item => item.usuario)
          .filter(usuarioId => usuarioId !== id);

        return Promise.all(
          usuarios.map(usuarioId => 
            fetch(`http://localhost:4000/api/auth/${usuarioId}`)
              .then(res => res.json())
              .catch(error => {
                console.error(`Error al obtener datos del usuario con ID ${usuarioId}:`, error);
                return null;
              })
          )
        );
      })
      .then(userInfoArray => {
        const usuariosInfo = userInfoArray.filter(info => info !== null);
        setCuentas(usuariosInfo);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  }, [id]);

  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cerrará tu sesión",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          title: 'Cerrando sesión...',
          text: 'Redirigiendo al inicio...',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        }).then(() => {
          navigate("/home");
        });
      }
    });
  };

  // Nueva función para manejar el inicio de sesión con la cuenta seleccionada
  const handleAccountClick = (cuenta) => {
    if (cuenta._id === userInfo._id) {
      // Si la cuenta seleccionada es la misma que la del usuario actual, redirigir sin preguntar
      navigate("/home");
    } else {
      // Si es una cuenta diferente, mostrar SweetAlert de confirmación
      Swal.fire({
        title: `¿Quieres iniciar sesión con ${cuenta.username}?`,
        text: "Se cerrará tu sesión actual",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, iniciar sesión'
      }).then((result) => {
        if (result.isConfirmed) {
          // Inicia sesión con la cuenta seleccionada
          fetch(`http://localhost:4000/api/auth/logeado`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: cuenta.email, password: cuenta.password }) // Envía el password en texto plano
          })
          .then(response => response.json())
          .then(data => {
            if (data.token) {
              localStorage.setItem("token", data.token); // Guarda el token en localStorage
              Swal.fire({
                title: '¡Sesión iniciada!',
                text: `Has iniciado sesión exitosamente con ${cuenta.username}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
              }).then(() => {
                navigate("/home"); // Redirige al inicio
              });
            } else {
              Swal.fire("Error", "No se pudo iniciar sesión con esta cuenta", "error");
            }
          })
          .catch(error => console.error("Error al iniciar sesión con la cuenta:", error));
        }
      });
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white text-black'} contenedor_cambio_cuenta flex items-center justify-center w-full min-h-screen`}>
      <div className="max-w-sm mx-auto bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg spacer">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-md">
            <img
              src="../../../src/images/logo-cifor.png"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"  // Imagen ajustada, tamaño flexible
            />
          </div>
          <h2 className="text-2xl font-bold text-center">Elegir o añadir una cuenta</h2>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-2">
          <ul className="space-y-2">
            {userInfo && (
              <li 
                className="flex items-center space-x-3 p-2 rounded-md transition-all duration-200 cuenta cursor-pointer" 
                onClick={() => {
                  Swal.fire({
                    title: '¿Quieres permanecer en esta cuenta?',
                    text: "Confirma si deseas seguir en esta cuenta.",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, permanecer',
                    cancelButtonText: 'No, cancelar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/home"); // Redirige al home si elige permanecer
                    }
                    // Si cancela, no se hace nada y permanece en el mismo lugar
                  });
                }}
              >
                <img 
                  src={userInfo.fotoUser || "../../src/images/usuario.jpg"} 
                  alt="" 
                  className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm'  // Imagen más pequeña
                />
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{userInfo.username}</div>
                  <div className="text-sm text-gray-300">{userInfo.email}</div>
                </div>
              </li>
            )}

            {cuentas.map(cuenta => (
              <li key={cuenta._id} className="flex items-center space-x-3 p-2 rounded-md transition-all duration-200 cuenta cursor-pointer" onClick={() => handleAccountClick(cuenta)}>
                <img src={cuenta.fotoUser || "../../src/images/usuario.jpg"} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />  // Imagen más pequeña
                <div className="flex flex-col">
                  <div className="text-lg font-semibold">{cuenta.username}</div>
                  <div className="text-sm text-gray-300">{cuenta.email}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2 border-t border-gray-200 pt-2">
          <ul className="space-y-2">
            {userInfo && userInfo._id ? (
              <Link to={`/cuenta/${userInfo._id}`} className='no-underline'>
                <li className="flex items-center justify-center space-x-2 p-2 rounded-md transition-all duration-200 cuenta">
                  <FaUserFriends className="w-5 h-5" />
                  <span className="font-medium">Añadir otra cuenta</span>
                </li>
              </Link>
            ) : (
              <Link to="/cuenta" className='no-underline'>
                <li className="flex items-center justify-center space-x-2 p-2 rounded-md transition-all duration-200 cuenta">
                  <FaUserFriends className="w-5 h-5" />
                  <span className="font-medium">Añadir otra cuenta</span>
                </li>
              </Link>
            )}
          </ul>
        </div>

        <div className="mt-2 border-t border-gray-200 pt-2">
          <ul className="space-y-2">
            <li className="flex items-center justify-center space-x-2 p-2 rounded-md transition-all duration-200 cuenta" onClick={handleLogout}>
              <FaSignOutAlt className="w-5 h-5" />
              <span className="font-medium">Cerrar sesión</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

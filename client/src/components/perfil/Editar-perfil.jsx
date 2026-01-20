import { useEffect, useState } from 'react';
import { FaUser, FaUserAlt, FaCamera, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { fetchUserInfo } from "../Function/infoToken";
import axios from "axios";
import "../../stilos/perfil.css";
import { useTheme } from '../../contex/themaContext'; 
import Añadir_foto_modal from './añadir_foto';

async function updateUser(token, userId, updatedData) {
  try {
    const response = await axios.put(`http://localhost:4000/api/upload/editar/${userId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Muestra un mensaje de éxito con SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Perfil actualizado',
      text: 'La información del usuario fue actualizada exitosamente.',
      confirmButtonText: 'Ok'
    });

    return response.data;
  } catch (error) {
    console.error("Error updating user info:", error);

    // Muestra un mensaje de error con SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar',
      text: 'No se pudo actualizar la información del usuario.',
      confirmButtonText: 'Cerrar'
    });

    throw new Error("No se pudo actualizar la información del usuario");
  }
}

async function eliminarFotoUser(token, userId) {
  try {
    const response = await axios.delete(`http://localhost:4000/api/upload/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Muestra un mensaje de éxito con SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Foto eliminada',
      text: 'La foto de perfil fue eliminada exitosamente.',
      confirmButtonText: 'Ok'
    });

    return response.data;
  } catch (error) {
    console.error("Error al eliminar la foto:", error);

    // Muestra un mensaje de error con SweetAlert
    Swal.fire({
      icon: 'error',
      title: 'Error al eliminar foto',
      text: 'No se pudo eliminar la imagen de perfil del usuario.',
      confirmButtonText: 'Cerrar'
    });

    throw new Error("No se pudo eliminar la imagen de perfil del usuario");
  }
}

export default function Editar_perfil({ onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: '',
    name: '',
    username: '',
    location: '',
    email: '',
    profileImage: '',
    fotoUser: ''
  });
  const { theme } = useTheme();

  const foto = () => {
    setUserInfo(prevState => ({
      ...prevState,
      fotoUser: prevState.fotoUser || "../../../src/images/usuario.jpg"
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token)
        .then(data => {
          setUserInfo({
            id: data._id,
            name: data.nombre_completo,
            username: data.username,
            location: data.location,
            email: data.email,
            fotoUser: data.fotoUser,
            profileImage: data.profileImage,
          });
          foto();
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  }, []);

  const handleImageUpload = (imageUrl, fotoUser) => {
    setUserInfo(prevState => ({
      ...prevState,
      profileImage: imageUrl,
      fotoUser: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const updatedData = {
      fotoUser: userInfo.fotoUser,
      nombre_completo: userInfo.name,
      username: userInfo.username,
      profileImage: userInfo.profileImage
    };

    try {
      await updateUser(token, userInfo.id, updatedData);
      Swal.fire({
        icon: 'success',
        title: 'Perfil actualizado',
        text: 'Perfil actualizado exitosamente',
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al actualizar el perfil',
        confirmButtonText: 'Cerrar'
      });
    }
  };

  const handleDeleteImage = async () => {
    const token = localStorage.getItem('token');
    
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará la imagen de perfil.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarFotoUser(token, userInfo.id);
          setUserInfo(prevState => ({ ...prevState, fotoUser: '../../../src/images/usuario.jpg' })); // Limpiar foto en UI
          Swal.fire('Eliminado', 'La imagen de perfil ha sido eliminada.', 'success');
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar la imagen de perfil.', 'error');
        }
      }
    });
  };

  return (
    <div className={`flex items-center justify-center min-h-screen p-2 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`} onClick={onClose}>
      <div className={`bg-white shadow-lg rounded-lg p-6 max-w-4xl max-h-[400px] w-full grid grid-cols-1 md:grid-cols-2 gap-8 ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
        <div className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center form-editar">
              <div className="relative group cursor-pointer">
               
                <img
                  src={userInfo.fotoUser || userInfo.profileImage}
                  alt="Profile" className="circular-image"/>

                <div className="absolute inset-0 flex items-center justify-center contenedor_iconos">
                  <FaCamera className="text-black text-2xl icono_camara" onClick={openModal} />
                  <FaTrash className="text-black text-2xl icono_eliminar" onClick={handleDeleteImage} />
                </div>
              </div>
              <div className="space-y-2">
                <div className={`text-xl font-semibold ${theme === 'dark' ? 'text-black' : 'text-black'}`}>
                  {userInfo.name || 'Nombre no disponible'}
                </div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-700' : 'text-gray-800'}`}>{userInfo.email || 'Email no disponible'}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <FaUser className="absolute top-1 left-2 text-gray-500" />
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-7">
                  Nombre completo
                </label>
                <input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  placeholder="Ingrese su nombre completo"
                  className={`mt-1 block w-full border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm py-2.5 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar`}
                />
              </div>
              <div className="relative">
                <FaUserAlt className="absolute top-1 left-2 text-gray-500" />
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 ml-7">
                  Username
                </label>
                <input
                  id="username"
                  value={userInfo.username}
                  onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                  placeholder="Ingrese su username"
                  className={`mt-1 block w-full border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm py-2.5 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar`}
                />
              </div>
              <div className='contenedor-form-editar-botones'>
                <button type="button" className="boton-form-editar-perfil" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="boton-form-editar-perfil">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center relative">
          <img
            src="../../../src/images2/editar3.jpg"
            alt="Edit Profile"
            className="w-full max-w-[350px] rounded-lg bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
          {isModalOpen && <Añadir_foto_modal onClose={closeModal} onImageUpload={handleImageUpload} />}
        </div>
      </div>
    </div>
  );
}

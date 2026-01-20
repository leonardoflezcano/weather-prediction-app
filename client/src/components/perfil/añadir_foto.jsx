import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import "../../stilos/perfil.css";
import Swal from 'sweetalert2';

export default function Añadir_foto_modal({ onClose, onImageUpload }) {
  const { userId } = useParams(); // Obtain userId from the URL parameters
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleContentClick = (e) => e.stopPropagation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => fileInputRef.current.click();

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) {
      // Muestra una alerta si no se selecciona una imagen
      Swal.fire({
        icon: 'warning',
        title: 'Selección de imagen',
        text: 'Por favor, selecciona una imagen antes de subirla.',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    const formData = new FormData();
    formData.append('fotoUser', imageFile);

    try {
      const response = await fetch(`http://localhost:4000/api/upload/${userId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Muestra una alerta de éxito cuando la imagen se sube correctamente
        Swal.fire({
          icon: 'success',
          title: 'Imagen subida con éxito',
          text: 'Tu imagen de perfil ha sido actualizada correctamente.',
          confirmButtonText: 'Ok'
        });
        onImageUpload(selectedImage); // Llamar a la función para actualizar la imagen en el perfil
        onClose();
      } else {
        const errorData = await response.text();
        // Muestra una alerta de error si la subida falla
        Swal.fire({
          icon: 'error',
          title: 'Error al subir la imagen',
          text: 'Hubo un problema al subir la imagen: ' + errorData,
          confirmButtonText: 'Cerrar'
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Muestra una alerta general de error si hay un problema de red o un fallo en la solicitud
      Swal.fire({
        icon: 'error',
        title: 'Error al subir la imagen',
        text: 'Hubo un error al subir la imagen, por favor inténtalo de nuevo.',
        confirmButtonText: 'Cerrar'
      });
    }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="max-w-xl mx-auto text-white p-6 rounded-lg relative contenedor-modal-perfil" onClick={handleContentClick}>
        <div className="flex flex-col items-center">
          <h2 className="text-xl text-dark font-semibold">Añade tu foto de perfil</h2>
          <div className="contedor-añadir-img" onDragOver={handleDragOver} onDrop={handleDrop}>
            <img
              src={selectedImage || "../../../src/images2/arrastra.jpg"}
              alt="Profile"
              className="object-cover h-32 w-32 rounded-full" // Adjust the image size
            />
          </div>
          <p className='text-dark'>o</p>
          <button className="boton-form-añadir-foto" onClick={handleButtonClick}>
            Cargar una imagen
          </button>
        </div>

        <div className='contenedor-form-añadir-foto-botones'>
          <button className="boton-form-añadir-foto" onClick={onClose}>
            Cancelar
          </button>
          <button className="boton-form-añadir-foto" onClick={uploadImage}>
            Cargar
          </button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
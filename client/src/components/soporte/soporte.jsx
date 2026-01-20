import { FaUser, FaEnvelope, FaTag,  FaComment } from 'react-icons/fa';
import "../../stilos/soporte.css";

export default function Soporte() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
        <div className="text-center space-y-4 contactanos">
            <h2 className="text-3xl md:text-3xl font-bold">
                Envía tus consultas o comentarios
            </h2>
        </div>
          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 ml-7">
                Nombre completo
              </label>
              <input
                id="name"
                placeholder="Ingrese su nombre completo"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="correo_electronico" className="block text-sm font-medium text-gray-700 ml-7">
                Correo electrónico
              </label>
              <input
                id="correo_electronico"
                placeholder="Ingrese su correo_electronico"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className="relative">
              <FaTag className="absolute top-1 left-2 text-gray-500" />
              <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 ml-7">
                Asunto
              </label>
              <input
                id="asunto"
                placeholder="Ingrese su asunto"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
              />
            </div>
            <div className="relative">
                <FaComment className="absolute top-1 left-2 text-gray-500" />
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 ml-7">
                    Mensaje
                </label>
                <textarea
                id="message"
                placeholder="Ingrese su mensaje"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pl-10 text-gray-700 focus:ring-primary focus:border-primary input-editar"
                />
            </div>
            
            <div className='contenedor-form-editar-botones'>
              <button className="boton-form-editar-perfil">
                cancelar
              </button>
              <button className="boton-form-editar-perfil">
                Enviar
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="../../../src/images2/contacto3.jpg"
            alt="Edit Profile"
            className="w-full max-w-[400px] rounded-lg bg-gradient-to-r from-[#8e2de2] to-[#4a00e0]"
            style={{ aspectRatio: "600/600", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
    );
}

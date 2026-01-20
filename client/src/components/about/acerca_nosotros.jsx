import { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Mail, Info, Target, Eye } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

export default function AcercaDePage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <motion.h1 
        className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        Sobre CIFOR
      </motion.h1>
      
      {/* Contenedor de botones */}
      <div className="flex justify-center mb-8 w-full max-w-md">
        <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 w-full">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'general'
                ? 'bg-black text-white' // Botón activo: fondo negro, letra blanca
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200' // Botón inactivo
            }`}
          >
            General
          </button>
          <button
            onClick={() => setActiveTab('mision')}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'mision'
                ? 'bg-black text-white' // Botón activo: fondo negro, letra blanca
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200' // Botón inactivo
            }`}
          >
            Misión
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              activeTab === 'vision'
                ? 'bg-black text-white' // Botón activo: fondo negro, letra blanca
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200' // Botón inactivo
            }`}
          >
            Visión
          </button>
        </div>
      </div>

      {/* Contenido dinámico */}
      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg max-w-2xl w-full"
      >
        {activeTab === 'general' && (
          <div>
            <div className="flex items-center mb-4">
              <Info className="text-blue-500 w-6 h-6 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Información General</h2>
            </div>
            <p className="text-lg text-gray-700">
              En <strong>CIFOR</strong> nos dedicamos a proporcionar datos climáticos precisos y en tiempo real de toda la provincia de Formosa, obtenidos de distintos servicios de estaciones meteorológicas. A través de la recopilación y análisis de estos datos, buscamos mejorar la precisión de los pronósticos del tiempo, desarrollar modelos agrícolas más efectivos y generar estadísticas climáticas confiables.
            </p>
          </div>
        )}
        {activeTab === 'mision' && (
          <div>
            <div className="flex items-center mb-4">
              <Target className="text-blue-500 w-6 h-6 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Nuestra Misión</h2>
            </div>
            <p className="text-lg text-gray-700">
              Nuestro objetivo es mejorar la precisión de los pronósticos meteorológicos para la provincia de Formosa mediante el consumo y análisis de datos obtenidos de diversas APIs meteorológicas. Queremos brindar a los usuarios comunes, especialmente a los habitantes de la región, información confiable y actualizada sobre las condiciones climáticas.
            </p>
          </div>
        )}
        {activeTab === 'vision' && (
          <div>
            <div className="flex items-center mb-4">
              <Eye className="text-blue-500 w-6 h-6 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Nuestra Visión</h2>
            </div>
            <p className="text-lg text-gray-700">
              Ser la principal fuente de datos climáticos en Formosa, expandiendo nuestras capacidades y mejorando continuamente la calidad y precisión de nuestras predicciones. Buscamos ser un referente en la investigación y desarrollo de soluciones para el cambio climático y el manejo agrícola.
            </p>
          </div>
        )}
      </motion.div>

      {/* Sección de contacto */}
      <motion.div
        className="mt-8 w-full max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Mail className="text-blue-500 w-6 h-6 mr-3" />
            <h2 className="text-xl font-semibold text-gray-800">Contáctanos</h2>
          </div>
          <p className="text-lg text-gray-700 mb-6">
            Nuestro equipo de soporte está aquí para ayudarte. Revisaremos tu consulta con la mayor prontitud posible y nos pondremos en contacto contigo a la brevedad.
          </p>
          <Link 
            to="/contacto" 
            className="inline-block px-6 py-3 bg-transparent text-black text-lg font-semibold border border-black rounded-lg shadow hover:bg-gray-200"
          >
            Ir a Contacto
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

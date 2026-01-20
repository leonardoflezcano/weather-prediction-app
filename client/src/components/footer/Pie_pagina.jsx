import { Link } from "react-router-dom";

export default function Pie_pagina() {
  return (
    <footer
      className="text-white py-12 md:py-16"
      style={{
        background: "linear-gradient(to right, #203376, #864ddf)", // Gradiente azul fuerte y violeta
      }}
    >
      <div className="container max-w-7xl flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
        
        {/* Columna izquierda: Enlaces de políticas */}
        <div className="flex flex-col space-y-4 md:w-1/3">
          <Link to="#" className="text-base hover:underline">
            Privacy Policy
          </Link>
          <Link to="#" className="text-base hover:underline">
            Terms of Service
          </Link>
          <Link to="#" className="text-base hover:underline">
            Support
          </Link>
        </div>

        {/* Columna central: Enlaces principales de navegación */}
        <div className="flex flex-col space-y-4 md:w-1/3">
          <Link to="/home" className="text-base hover:underline">
            Home
          </Link>
          <Link to="/weather" className="text-base hover:underline">
            Weather
          </Link>
          <Link to="/about" className="text-base hover:underline">
            About Us
          </Link>
          <Link to="/contacto" className="text-base hover:underline">
            Contact
          </Link>
        </div>

        {/* Columna derecha: Enlaces adicionales */}
        <div className="flex flex-col space-y-4 md:w-1/3">
          <Link to="/mapa" className="text-base hover:underline">
            Map
          </Link>
          <Link to="/modelo_prediccion" className="text-base hover:underline">
            Prediction
          </Link>
          <Link to="/noticias" className="text-base hover:underline">
            News
          </Link>
        </div>
      </div>

      {/* Derechos reservados, centrado abajo */}
      <div className="mt-6 flex justify-center">
        <p className="text-base text-gray-400">&copy; 2024 CIFOR. All rights reserved.</p>
      </div>
    </footer>
  );
}

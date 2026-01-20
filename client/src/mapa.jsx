import React from "react";
import Nav from "./components/Navbar/Nav.jsx";
import Footer from './footer.jsx';
import MapWithCircles from "./components/Mapa/MapCircle.jsx";

function Mapa() {
  return (
    <div 
      className="mapa_principal" 
      style={{ 
        background: "#ffffff", // Fondo blanco para la página principal
        color: "#000000", // Texto negro para contrast
      }}
    >
      <Nav />
      <div 
        className="map-container" 
        style={{
          background: "#ffffff", // Fondo blanco para el contenedor del mapa
          padding: "10px", // Padding ajustado
          width: "calc(100% + 40px)", // Aumento el ancho un poco más
          marginLeft: "-30px", // Desplazamiento a la izquierda para ajustar el aumento de ancho
        }} 
      >
        <MapWithCircles />
      </div>
      {/* Renderizar el footer solo en esta página */}
      <Footer />
    </div>
  );
}

export default Mapa;

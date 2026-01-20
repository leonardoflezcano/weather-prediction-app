import React from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import "../../stilos/MiniMap.css";

const MiniMap = () => {
  const navigate = useNavigate();

  const handleOpenMap = () => {
    navigate("/mapa"); // Redirigir a la ruta del mapa grande
  };

  return (
    <div className="mini-map">
      <MapContainer
        center={[-26.1849, -58.1731]}
        zoom={10}
        style={{ height: "230px", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
      <button onClick={handleOpenMap} className="map-button">
        Ver mapa completo
      </button>
    </div>
  );
};

export default MiniMap;
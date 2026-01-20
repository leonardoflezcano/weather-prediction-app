import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WeatherForecast from "./Tiempo-grafico";
import Tiempo_por_hora from "./tiempo_por_hora";
import Weather_details from "./Tiempo_detalles";
import "../../../src/stilos/tiempo_general.css"

const Tiempo_contenedor = () => {
  const [selectedView, setSelectedView] = useState('resumen');

  const renderComponent = () => {
    if (selectedView === 'resumen') {
      return <WeatherForecast />;
    } else if (selectedView === 'por_hora') {
      return <Tiempo_por_hora />;
    } else if (selectedView === 'detalles') {
      return <Weather_details />;
    }
  };

  return (
    <div className="general">
      <div className="weather-container">
        <div className="weather-header">
          <Link to="/Weather" onClick={() => setSelectedView('resumen')}>Resumen</Link>
          <Link to="/Weather" onClick={() => setSelectedView('por_hora')}>Por horas</Link>
          <Link to="/Weather" onClick={() => setSelectedView('detalles')}>Más detalles</Link>
        </div>
        <div className="contenedor_tiempo_por_hora">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Tiempo_contenedor;

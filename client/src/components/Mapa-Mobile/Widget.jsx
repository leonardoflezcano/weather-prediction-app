// client/src/components/Mapa/Widget.jsx
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../stilos/witged.css";
import soleadoDia from "./images/soleado-dia.gif";
import soleadoNoche from "./images/soleado-noche.gif";
import lluviaDia from "./images/lluvia-dia.gif";
import lluviaNoche from "./images/lluvia-noche.gif";
import nubladoDia from "./images/nublado-dia.gif";
import nubladoNoche from "./images/nublado-noche.gif";
import tormentaDia from "./images/tormenta-dia.gif";
import tormentaNoche from "./images/tormenta-noche.gif";

// Función para obtener la hora actual
const isDaytime = () => {
  const hours = new Date().getHours();
  return hours >= 6 && hours < 18; // De 6 AM a 6 PM se considera de día
};

// Asignación de fondos de acuerdo al clima y momento del día
const backgroundImages = {
  "sunny-day-bg": soleadoDia,
  "sunny-night-bg": soleadoNoche,
  "rainy-day-bg": lluviaDia,
  "rainy-night-bg": lluviaNoche,
  "cloudy-day-bg": nubladoDia,
  "cloudy-night-bg": nubladoNoche,
  "stormy-day-bg": tormentaDia,
  "stormy-night-bg": tormentaNoche,
};

// Selección dinámica del fondo según el clima
const getBackgroundClass = (
  temperature,
  precipitation,
  windSpeed,
  solarRadiation
) => {
  const dayTime = isDaytime();

  // Usar la radiación solar como indicador de nubosidad si es de día
  if (dayTime) {
    if (solarRadiation < 200) return "cloudy-day-bg"; // Baja radiación => nublado
    if (temperature >= 30) return "sunny-day-bg"; // Alta temperatura => soleado
  } else {
    if (precipitation > 5) return "rainy-night-bg"; // Precipitación alta en la noche => lluvioso
  }

  if (windSpeed > 15) return dayTime ? "stormy-day-bg" : "stormy-night-bg"; // Viento fuerte => tormenta
  return dayTime ? "sunny-day-bg" : "sunny-night-bg"; // Predeterminado
};

export const Widget = ({ selectedStation }) => {
  const {
    airTemp: temperature,
    rh: humidity,
    pressure,
    windSpeed,
    rain_last: precipitation,
    solarRadiation = 0, // Radiación solar
  } = selectedStation.meta || {};

  const { custom } = selectedStation.name || {};

  const backgroundClass = getBackgroundClass(
    temperature || 0,
    precipitation || 0,
    windSpeed || 0,
    solarRadiation
  );

  return (
    <div
      className="widget-container pro"
      style={{
        backgroundImage: `url(${backgroundImages[backgroundClass] || ""})`,
      }}
    >
      <div className="widget-header">
        <h3>{custom || "Estación No Seleccionada"}</h3>
        <span>{new Date().toLocaleDateString()}</span>
      </div>

      <div className="widget-content">
        <div className="progress-wrapper">
          <CircularProgressbar
            value={temperature || 0}
            maxValue={50}
            text={`${temperature || 0}°C`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#ffffff",
              trailColor: "rgba(255, 255, 255, 0.3)",
            })}
          />
        </div>

        <div className="weather-details">
          <div className="detail">
            <i className="fas fa-tint"></i>
            <span>Humedad: {humidity || 0}%</span>
          </div>
          <div className="detail">
            <i className="fas fa-wind"></i>
            <span>Viento: {windSpeed || 0} m/s</span>
          </div>
          <div className="detail">
            <i className="fas fa-cloud-sun"></i>
            <span>Precipitación: {precipitation || 0} mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import {
  FaTemperatureLow,
  FaTint,
  FaWind,
  FaTachometerAlt,
} from "react-icons/fa";
import "../../stilos/WeatherCard.css";
import partlyCloudyBackground from "../../assets/fondo.jpg"; // Importa la imagen de fondo

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <div
        className="weather-background"
        style={{ backgroundImage: `url(${partlyCloudyBackground})` }}
      >
        <h2 className="weather-card-title"> &#128205;{data.location}</h2>
        <div className="weather-card-content">
          <div className="temperature-column">
            <div className="temperature">
              
              <h1 className="weather-info-label-temperatura"><FaTemperatureLow/>  {data.temperature}</h1>
            </div>
          </div>
          <div className="details-column">
            <div className="weather-info">
              <div className="weather-info-item">
                <FaTint className="weather-icon" />

                <span className="weather-info-value">{data.humidity}</span>
              </div>
              <div className="weather-info-item">
                <FaTachometerAlt className="weather-icon" />

                <span className="weather-info-value">{data.pressure} </span>
              </div>
              <div className="weather-info-item">
                <FaWind className="weather-icon" />

                <span className="weather-info-value">{data.windSpeed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
// client/src/components/Mapa/StationInfo.jsx
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "@fortawesome/fontawesome-free/css/all.min.css";

const defaultStation = {
  id: 0,
  coords: [-25.2637, -58.5973],
  name: "Información General de Formosa",
  color: "blue",
  info: "Esta vista muestra información climática general de la provincia de Formosa.",
  temperature: 29,
  humidity: 70,
  pressure: 1010,
  windSpeed: 12,
  precipitation: 1,
};

const StationInfo = ({ stations = [], station, averages }) => {
  const [selectedStation, setSelectedStation] = useState(
    station || defaultStation
  );

  useEffect(() => {
    console.log("Estaciones recibidas:", stations);
    console.log("Datos de estación seleccionada:", selectedStation);
    setSelectedStation(station || defaultStation);
  }, [station, stations]);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const newStation =
      stations.find((st) => st._id === selectedId) || defaultStation;
    setSelectedStation(newStation);
  };

  const renderChart = (station) => ({
    labels: [
      "Temperatura",
      "Humedad",
      "Radio Solar",
      "Vel. Viento",
      "Precipitación",
    ],
    datasets: [
      {
        label: station.name,
        data: [
          station.meta?.airTemp,
          station.meta?.rh,
          station.meta?.solarRadiation,
          station.meta?.windSpeed,
          station.meta?.rain_last,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  });

  return (
    <div className="panel">
      <div className="dropdown-container">
        <select
          className="dropdown"
          value={selectedStation._id || ""}
          onChange={handleSelectChange}
        >
          <option value="">{defaultStation.name}</option>
          {stations.map((st) => (
            <option key={st._id} value={st._id}>
              {st.name?.custom || st.name || "Estación sin nombre"}
            </option>
          ))}
        </select>
      </div>
      <div className="content-container">
        <div className="chart-container">
          <Line data={renderChart(selectedStation)} />
        </div>
      </div>
      <div className="table-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Temperatura (°C)</th>
              <th>Humedad (%)</th>
              <th>Radiación solar (W/m²)</th>
              <th>Vel. Viento (m/s)</th>
              <th>Precipitación (mm)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedStation.meta?.airTemp || averages.temperature}</td>
              <td>{selectedStation.meta?.rh || averages.humidity}</td>
              <td>
                {selectedStation.meta?.solarRadiation ||
                  averages.solarRadiation}
              </td>
              <td>{selectedStation.meta?.windSpeed || averages.windSpeed}</td>
              <td>
                {selectedStation.meta?.rain_last || averages.precipitation}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationInfo;

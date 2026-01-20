import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Widget } from "./Widget.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../../src/stilos/stacion_info.css";
import { stationDataById } from "./data/stationDataById.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Legend,
  Tooltip
);

const StationInfo = ({ stations = [], station, averages }) => {
  const [selectedStation, setSelectedStation] = useState(station || {});
  const [selectedVariable, setSelectedVariable] = useState("temperature");

  useEffect(() => {
    setSelectedStation(station || {});
  }, [station]);

  const handleStationChange = (event) => {
    const selectedId = event.target.value;
    if (selectedId === "general") {
      setSelectedStation({
        _id: "general",
        name: { custom: "Seleccione una estación" },
      });
    } else {
      const newStation = stations.find((st) => st._id === selectedId) || {};
      setSelectedStation(newStation);
    }
  };

  const handleVariableChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  const data =
    stationDataById[selectedStation._id]?.map((entry) => ({
      date: entry.date,
      value: entry[selectedVariable],
    })) || [];

  const chartData = {
    labels: data.map((entry) => entry.date),
    datasets: [
      {
        label: `${selectedVariable} de ${
          selectedStation.name?.custom ||
          selectedStation.name?.original ||
          "Estación"
        }`,
        data: data.map((entry) => entry.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} (${selectedVariable})`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Fechas ",
          color: "#333",
        },
      },
      y: {
        title: {
          display: true,
          text: `${selectedVariable}`,
          color: "#333",
        },
      },
    },
  };

  return (
    <div className="panel">
      <div className="dropdown-container" style={{ marginBottom: "1rem" }}>
        <select
          className="dropdown"
          value={selectedStation._id || ""}
          onChange={handleStationChange}
          style={{ marginRight: "1rem", color: "black" }}
        >
          <option value="general">Seleccione una estación</option>
          {stations.map((st) => (
            <option key={st._id} value={st._id}>
              {st.name?.custom || st.name?.original || "Estación sin nombre"}
            </option>
          ))}
        </select>
        <select
          className="dropdown"
          value={selectedVariable}
          onChange={handleVariableChange}
          style={{ color: "black" }}
        >
          <option value="temperature">Temperatura (°C)</option>
          <option value="humidity">Humedad (%)</option>
          <option value="solarRadiation">Radiación Solar (W/m²)</option>
          <option value="windSpeed">Velocidad del Viento (m/s)</option>
          <option value="precipitation">Precipitación (mm)</option>
        </select>
      </div>
      <div className="content-container">
        <Widget selectedStation={selectedStation} averages={averages} />
        <div className="chart-container">
          {data.length > 0 ? (
            <Line data={chartData} options={options} />
          ) : (
            <p className="text-black">
              No hay datos disponibles para mostrar el gráfico.
            </p>
          )}
        </div>
      </div>
      <div className="table-container">
        <div className="scrollable-table">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Temperatura (°C)</th>
                <th>Humedad (%)</th>
                <th>Radiación Solar (W/m²)</th>
                <th>Velocidad del Viento (m/s)</th>
                <th>Precipitación (mm)</th>
              </tr>
            </thead>
            <tbody>
              {stationDataById[selectedStation._id]?.map((data, index) => (
                <tr key={index}>
                  <td>{data.date}</td>
                  <td>{data.temperature} °C</td>
                  <td>{data.humidity}%</td>
                  <td>{data.solarRadiation} W/m²</td>
                  <td>{data.windSpeed} m/s</td>
                  <td>{data.precipitation} mm</td>
                </tr>
              )) || (
                <tr>
                  <td colSpan="6" className="text-center">
                    No hay datos disponibles para esta estación.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StationInfo;
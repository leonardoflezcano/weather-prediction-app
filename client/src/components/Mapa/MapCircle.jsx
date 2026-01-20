import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  LayersControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FormosaCityGeoJSON } from "./data/Departamentos.js";
import StationInfo from "./stationInfo.jsx";
import { Bar } from "react-chartjs-2";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "./styles/customStyles.css";

const { BaseLayer, Overlay } = LayersControl;

// Componente de control de búsqueda
function SearchControl() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      marker: {
        icon: new L.Icon({
          iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
          shadowUrl:
            "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
        }),
      },
      autoClose: true,
      searchLabel: "Buscar ubicación...", // Cambiar el placeholder a español
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}

function MapWithCircles() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [stationData, setStationData] = useState([]);
  const [token, setToken] = useState(null);
  const [averages, setAverages] = useState({
    temperature: 0,
    humidity: 0,
    windSpeed: 0,
    precipitation: 0,
  });

  const formosaCenter = [-24.786927, -60.182694];
  const zoomLevel = 6;

  useEffect(() => {
    const loginAndGetToken = async () => {
      try {
        const { data } = await axios.post(
          "https://ramf.formosa.gob.ar/api/auth/login",
          {
            email: "maximilianopietkiewicz04@gmail.com",
            password: "Maxi45745",
          }
        );
        setToken(data.token);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };
    loginAndGetToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchStations = async () => {
      try {
        const { data } = await axios.get(
          "https://ramf.formosa.gob.ar/api/station",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStations(data);
      } catch (error) {
        console.error("Error al cargar estaciones:", error);
      }
    };
    fetchStations();
  }, [token]);

  useEffect(() => {
    if (!selectedStation || !token) return;

    const fetchStationData = async () => {
      try {
        const { data } = await axios.get(
          `https://ramf.formosa.gob.ar/api/station-data/${selectedStation._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStationData(data);
      } catch (error) {
        console.error("Error al obtener los datos de la estación:", error);
      }
    };
    fetchStationData();
  }, [selectedStation, token]);

  useEffect(() => {
    if (stations.length > 0) {
      const total = stations.length;
      const totals = stations.reduce(
        (acc, station) => ({
          temperature: acc.temperature + (station.meta?.airTemp || 0),
          humidity: acc.humidity + (station.meta?.rh || 0),
          windSpeed: acc.windSpeed + (station.meta?.windSpeed || 0),
          precipitation: acc.precipitation + (station.meta?.rain_last || 0),
        }),
        { temperature: 0, humidity: 0, windSpeed: 0, precipitation: 0 }
      );

      setAverages({
        temperature: (totals.temperature / total).toFixed(2),
        humidity: (totals.humidity / total).toFixed(2),
        windSpeed: (totals.windSpeed / total).toFixed(2),
        precipitation: (totals.precipitation / total).toFixed(2),
      });
    }
  }, [stations]);

  const getIcon = (temp) => {
    const iconUrl = "https://img.icons8.com/ultraviolet/100/marker.png";

    return L.icon({
      iconUrl,
      iconSize: [30, 30], // Tamaño del ícono
      iconAnchor: [15, 15], // Punto donde se "ancla" el ícono
      popupAnchor: [0, -15], // Punto donde se despliega el popup
    });
  };

  const layerTranslations = {
    temp_new: "Temperatura",
    precipitation_new: "Precipitación",
    pressure_new: "Presión",
    wind_new: "Viento",
    clouds_new: "Nubes",
  };

  return (
    <div className="container-fluid">
      <div className="row flex-column">
        <MapContainer
          center={formosaCenter}
          zoom={zoomLevel}
          style={{
            height: "80vh",
            width: "98%",
            marginLeft: "17px",
          }}
          zoomControl={true}
        >
          <SearchControl />
          <LayersControl position="topright">
            <BaseLayer checked name="Mapa de Calle">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </BaseLayer>
            <BaseLayer name="Mapa de Satélite">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </BaseLayer>

            {[
              "temp_new",
              "precipitation_new",
              "pressure_new",
              "wind_new",
              "clouds_new",
            ].map((layer, idx) => (
              <Overlay
                key={idx}
                name={` ${layerTranslations[layer] || layer}`}
                checked={idx === 0 || idx === 1}
              >
                <TileLayer
                  attribution="&copy; OpenWeatherMap"
                  url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=e3dadbc788d4e55d0bc120577741bc69`}
                />
              </Overlay>
            ))}
          </LayersControl>

          {stations.map((station) => (
            <Marker
              key={station._id}
              position={[
                station.position.geo.coordinates[1],
                station.position.geo.coordinates[0],
              ]}
              icon={getIcon(station.meta?.airTemp)}
              eventHandlers={{
                click: () => setSelectedStation(station),
              }}
            >
              <Popup>
                <div style={{ textAlign: "center", minWidth: "200px" }}>
                  <h4 style={{ marginBottom: "10px" }}>
                    {station.name?.custom || "Estación sin nombre"}
                  </h4>
                  <div style={{ marginBottom: "10px", fontSize: "14px" }}>
                    <p>
                      <strong>Temperatura:</strong>{" "}
                      {station.meta?.airTemp || "0"} °C
                    </p>
                    <p>
                      <strong>Humedad:</strong> {station.meta?.rh || "0"} %
                    </p>

                    <p>
                      <strong>Precipitación:</strong>{" "}
                      {station.meta?.rain_last || "0"} mm
                    </p>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Bar
                      data={{
                        labels: [
                          "Temp (°C)",
                          "Humedad (%)",
                          "Precipitación (mm)",
                        ],
                        datasets: [
                          {
                            label: "Datos",
                            data: [
                              station.meta?.airTemp || 0,
                              station.meta?.rh || 0,

                              station.meta?.rain_last || 0,
                            ],
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                          },
                        ],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: { stepSize: 5 },
                          },
                        },
                      }}
                      height={150}
                      width={250}
                    />
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <GeoJSON
            data={FormosaCityGeoJSON}
            style={{ color: "green", weight: 2 }}
          />
        </MapContainer>
      </div>
      <StationInfo
        stations={stations}
        station={selectedStation}
        stationData={stationData}
        averages={averages}
      />
    </div>
  );
}

export default MapWithCircles;
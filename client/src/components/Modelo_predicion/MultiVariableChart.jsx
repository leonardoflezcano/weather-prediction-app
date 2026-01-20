import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const WeatherChart = () => {
  const [data, setData] = useState(null);
  const [futureData, setFutureData] = useState(null);

  useEffect(() => {
    // Cargar el archivo predictions.json
    axios.get('/prediction.json')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error loading the data: ", error);
      });

    // Cargar el archivo proximos.json para las predicciones futuras
    axios.get('/proximos.json')
      .then(response => {
        setFutureData(response.data);
      })
      .catch(error => {
        console.error("Error loading future data: ", error);
      });
  }, []);

  if (!data || !futureData) {
    return <div>Loading...</div>;
  }

  // Filtrar los datos para las predicciones pasadas
  const filteredData = data.days
    .map(day => ({
      datetime: day.datetime,  
      tempmax: day.tempmax,     
      tempmin: day.tempmin,     
      precip: day.precip,      
      windspeed: day.windspeed, 
      feelslikemax: day.feelslikemax, 
      feelslikemin: day.feelslikemin, 
    }))
    .filter(day => 
      day.tempmax !== null && day.tempmin !== null && day.precip !== null && 
      day.windspeed !== null && day.feelslikemax !== null && day.feelslikemin !== null
    );

  // Filtrar los datos futuros
  const futureFilteredData = futureData.days
    .map(day => ({
      datetime: day.datetime,  
      tempmax: day.tempmax,     
      tempmin: day.tempmin,     
      precip: day.precip,      
      windspeed: day.windspeed, 
      feelslikemax: day.feelslikemax, 
      feelslikemin: day.feelslikemin, 
    }))
    .filter(day => 
      day.tempmax !== null && day.tempmin !== null && day.precip !== null && 
      day.windspeed !== null && day.feelslikemax !== null && day.feelslikemin !== null
    );
  // Función para volver a la página anterior
  const goBack = () => {
    window.history.back();
  };

  return (
    <div style={{ width: '100%', margin: '0 auto', padding: '20px' }}>
    <button onClick={goBack} style={styles.backButton}>&larr; </button>
      <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '30px' }}>
        Gráfico de Predicciones Pasadas
      </h2>

      {/* Gráfico combinado de todas las variables (predicciones pasadas) */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tempmax" stroke="#8884d8" name="Temperatura Máxima (°C)" />
          <Line type="monotone" dataKey="tempmin" stroke="#82ca9d" name="Temperatura Mínima (°C)" />
          <Line type="monotone" dataKey="precip" stroke="#ff7300" name="Precipitación (mm)" />
          <Line type="monotone" dataKey="windspeed" stroke="#ff0000" name="Velocidad del Viento (km/h)" />
          <Line type="monotone" dataKey="feelslikemax" stroke="#ffc658" name="Sensación Térmica Máxima (°C)" />
          <Line type="monotone" dataKey="feelslikemin" stroke="#ffca3a" name="Sensación Térmica Mínima (°C)" />
        </LineChart>
      </ResponsiveContainer>

      {/* Gráficos separados para cada variable (predicciones pasadas) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {/* Temperatura Máxima */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Temperatura Máxima</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tempmax" fill="#8884d8" name="Temperatura Máxima (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Temperatura Mínima */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Temperatura Mínima</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tempmin" fill="#82ca9d" name="Temperatura Mínima (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Precipitación */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Precipitación</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="precip" fill="#ff7300" name="Precipitación (mm)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Velocidad del Viento */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Velocidad del Viento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="windspeed" fill="#ff0000" name="Velocidad del Viento (km/h)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sensación Térmica Máxima */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Sensación Térmica Máxima</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="feelslikemax" fill="#ffc658" name="Sensación Térmica Máxima (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sensación Térmica Mínima */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Sensación Térmica Mínima</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="feelslikemin" fill="#ffca3a" name="Sensación Térmica Mínima (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráficos combinados de las predicciones futuras */}
      <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '30px' }}>
        Gráfico de Predicciones Futuras
      </h2>

      {/* Gráfico combinado de todas las variables (predicciones futuras) */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={futureFilteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tempmax" stroke="#8884d8" name="Temperatura Máxima (°C)" />
          <Line type="monotone" dataKey="tempmin" stroke="#82ca9d" name="Temperatura Mínima (°C)" />
          <Line type="monotone" dataKey="precip" stroke="#ff7300" name="Precipitación (mm)" />
          <Line type="monotone" dataKey="windspeed" stroke="#ff0000" name="Velocidad del Viento (km/h)" />
          <Line type="monotone" dataKey="feelslikemax" stroke="#ffc658" name="Sensación Térmica Máxima (°C)" />
          <Line type="monotone" dataKey="feelslikemin" stroke="#ffca3a" name="Sensación Térmica Mínima (°C)" />
        </LineChart>
      </ResponsiveContainer>

      {/* Gráficos separados para cada variable (predicciones futuras) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {/* Temperatura Máxima */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Temperatura Máxima</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={futureFilteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tempmax" fill="#8884d8" name="Temperatura Máxima (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Temperatura Mínima */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Temperatura Mínima</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={futureFilteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tempmin" fill="#82ca9d" name="Temperatura Mínima (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Precipitación */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Precipitación</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={futureFilteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="precip" fill="#ff7300" name="Precipitación (mm)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Velocidad del Viento */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Velocidad del Viento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={futureFilteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="windspeed" fill="#ff0000" name="Velocidad del Viento (km/h)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sensación Térmica Máxima */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Sensación Térmica Máxima</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={futureFilteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="feelslikemax" fill="#ffc658" name="Sensación Térmica Máxima (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sensación Térmica Mínima */}
        <div style={{ width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
          <h3 style={{ textAlign: 'center' }}>Sensación Térmica Mínima</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={futureFilteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="feelslikemin" fill="#ffca3a" name="Sensación Térmica Mínima (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

{/* Gráfico combinado de todas las variables para las predicciones pasadas y futuras */}
<h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '30px' }}>
Gráfico combinado de todas las variables para las predicciones pasadas y futuras
      </h2>
<ResponsiveContainer width="100%" height={400}>
  <LineChart data={filteredData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="datetime" tickFormatter={(value) => new Date(value).toLocaleDateString("es-AR")} />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="tempmax" stroke="#8884d8" name="Temperatura Máxima (°C) Pasada" />
    <Line type="monotone" dataKey="tempmin" stroke="#82ca9d" name="Temperatura Mínima (°C) Pasada" />
    <Line type="monotone" dataKey="precip" stroke="#ff7300" name="Precipitación (mm) Pasada" />
    <Line type="monotone" dataKey="windspeed" stroke="#ff0000" name="Velocidad del Viento (km/h) Pasada" />
    <Line type="monotone" dataKey="feelslikemax" stroke="#ffc658" name="Sensación Térmica Máxima (°C) Pasada" />
    <Line type="monotone" dataKey="feelslikemin" stroke="#ffca3a" name="Sensación Térmica Mínima (°C) Pasada" />
  </LineChart>
</ResponsiveContainer>


      </div>
    </div>
  );
};
const styles = {
    
    backButton: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#333',
      },
      
  };


export default WeatherChart;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeatherPromedios = () => {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2024-12-04');
  const [error, setError] = useState(null);

  // Función para obtener los datos de la API
  const fetchData = async (date) => {
    try {
      setError(null); // Limpiar errores anteriores
      const response = await axios.get(
        `http://localhost:3000/api/model/promedios?startDate=${date}&endDate=${date}&date=${date}`
      );

      if (response.data && response.data.promedios) {
        const formattedData = {
          rango: {
            inicio: response.data.inicio,
            fin: response.data.fin,
          },
          promedios: {
            temperatura: parseFloat(response.data.promedios.temperatura),
            humedad: parseFloat(response.data.promedios.humedad),
            lluvia: parseFloat(response.data.promedios.lluvia),
            velocidadViento: parseFloat(response.data.promedios.velocidadViento),
            totalRegistros: response.data.promedios.totalRegistros,
          },
        };

        setData(formattedData); // Guardar los datos formateados
      } else {
        throw new Error('Datos no encontrados en la respuesta de la API.');
      }
    } catch (error) {
      setError('Error al obtener los datos. Por favor, intenta nuevamente.');
      console.error(error);
    }
  };

  // Ejecutar fetchData cada vez que cambia la fecha
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  // Si no hay datos, mostrar mensaje
  if (!data) {
    return <p style={styles.loading}>{error || 'Cargando los datos...'}</p>;
  }

  // Datos para el gráfico
  const chartData = {
    labels: ['Promedio'],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [data.promedios.temperatura],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Humedad (%)',
        data: [data.promedios.humedad],
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Lluvia (mm)',
        data: [data.promedios.lluvia],
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Velocidad del Viento (km/h)',
        data: [data.promedios.velocidadViento],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Promedios Meteorológicos: ${data.rango.inicio} - ${data.rango.fin}`,
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Manejar el cambio de fecha
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Actualizar la fecha seleccionada
  };

  // Función para volver a la página anterior
  const goBack = () => {
    window.history.back();
  };

  return (
    <div style={styles.container}>
      <button onClick={goBack} style={styles.backButton}>&larr;</button>
      <h2 style={styles.title}>Promedios Meteorológicos</h2>
      <div style={styles.dateInputWrapper}>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split('T')[0]} // Solo fechas hasta hoy
          style={styles.dateInput}
        />
      </div>
      <div style={styles.chartContainer}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    width: '90%',
    height: '90vh',
    margin: '20px auto',
  },
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
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '30px',
  },
  dateInputWrapper: {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'center',
  },
  dateInput: {
    padding: '12px',
    fontSize: '1.2rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    maxWidth: '350px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
  chartContainer: {
    width: '100%',
    height: '400px',
    maxWidth: '800px',
    marginTop: '20px',
  },
};

export default WeatherPromedios;

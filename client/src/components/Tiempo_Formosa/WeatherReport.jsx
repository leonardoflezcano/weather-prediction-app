import React, { useEffect, useState } from 'react'
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, Wind, CloudFog, Droplet, CloudDrizzle, Thermometer, Umbrella, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import annotationPlugin from 'chartjs-plugin-annotation';

import sol from '../../images/icons_weather/sol.png';
import nubes from '../../images/icons_weather/parcialmente_nublado.png';
import parcialmente_nublado from '../../images/icons_weather/nube.png';
import lluvia from '../../images/icons_weather/lluvia.png';
import tormenta from '../../images/icons_weather/tormenta.png';
import nieve from '../../images/icons_weather/niieve.png';
import niebla from '../../images/icons_weather/niebla.png';
import viento from '../../images/icons_weather/viento.png';
import llovizna from '../../images/icons_weather/llovizna.png';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    <span className="text-xl text-gray-700">Cargando datos del tiempo...</span>
  </div>
);

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true); // Comienza a cargar
      const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/formosa%20argentina?unitGroup=metric&key=UMQ9KWF37S9T6WL8J4WLN5Q23&contentType=json')
      const data = await response.json()
      setWeatherData(data)
      setLoading(false); // Termina de carga
    }

    fetchWeatherData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <LoadingSpinner /> {/* Muestra el spinner mientras carga */}
      </div>
    );
  }
  
  
// Traducciones para los días y meses en español
const daysOfWeek = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];
const monthsOfYear = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Obtener la fecha actual en el formato deseado
const currentDate = new Date();
const formattedDate = `${daysOfWeek[currentDate.getDay()]} ${currentDate.getDate()} de ${monthsOfYear[currentDate.getMonth()]}`;



  const current = weatherData.currentConditions
  const currentCondition = {
    'Clear': 'Despejado',
    'Partially cloudy': 'Parcialmente Nublado',
    'Cloudy': 'Nublado',
    'Rain': 'Lluvia',
    'Thunderstorms': 'Tormentas',
    'Snow': 'Nieve',
    'Fog': 'Niebla',
    'Windy': 'Ventoso',
    'Overcast': 'Cubierto',
    'Drizzle': 'Llovizna',
    'Showers': 'Aguaceros',
    'Freezing Rain': 'Lluvia Helada',
    'Sleet': 'Aguacero de Hielo',
  }[current.conditions] || current.conditions
  const conditionTranslations = {
    'Clear': 'Despejado',
    'Partially cloudy': 'Parcialmente Nublado',
    'Cloudy': 'Nublado',
    'Rain': 'Lluvia',
    'Rain, Overcast': 'Lluvia, Cubierto',
    'Rain, Partially cloudy': 'Lluvia, Parcialmente Nublado',
    'Thunderstorms': 'Tormentas',
    'Snow': 'Nieve',
    'Fog': 'Niebla',
    'Windy': 'Ventoso',
    'Overcast': 'Cubierto',
    'Drizzle': 'Llovizna',
    'Showers': 'Aguaceros',
    'Freezing Rain': 'Lluvia Helada',
    'Sleet': 'Aguacero de Hielo',
  };
  const weatherIcons = {
    'Clear': <img src={sol} alt="Sol" className="w-16 h-16" />,
    'Partially cloudy': <img src={nubes} alt="Nubes" className="w-16 h-16" />,
    'Cloudy': <img src={nubes} alt="Nublado" className="w-16 h-16" />,
    'Rain': <img src={lluvia} alt="Lluvia" className="w-16 h-16" />,
    'Thunderstorms': <img src={tormenta} alt="Tormenta" className="w-16 h-16" />,
    'Snow': <img src={nieve} alt="Nieve" className="w-16 h-16" />,
    'Fog': <img src={niebla} alt="Niebla" className="w-16 h-16" />,
    'Windy': <img src={viento} alt="Viento" className="w-16 h-16" />,
    'Overcast': <img src={parcialmente_nublado} alt="Cubierto" className="w-16 h-16" />,
    'Drizzle': <img src={llovizna} alt="Llovizna" className="w-16 h-16" />,
    'Showers': <img src={lluvia} alt="Aguaceros" className="w-16 h-16" />,
    'Freezing Rain': <img src={lluvia} alt="Lluvia Helada" className="w-16 h-16" />,
    'Sleet': <img src={lluvia} alt="Aguacero de Hielo" className="w-16 h-16" />,
  };

  const getIcon = (condition) => {
    for (const conditionKey in weatherIcons) {
      if (condition.startsWith(conditionKey)) {
        return weatherIcons[conditionKey];
      }
    }
  }
  
  


  // Datos para el gráfico (hasta 15 días)
  const labels = weatherData.days.slice(1, 16).map(day => new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'short' }));
  const maxTemps = weatherData.days.slice(1, 16).map(day => day.tempmax);
  const minTemps = weatherData.days.slice(1, 16).map(day => day.tempmin);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperatura Máxima (°C)',
        data: maxTemps,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Temperatura Mínima (°C)',
        data: minTemps,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Perspectivas de Temperatura a Largo Plazo (15 Días)',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 30, // valor mínimo de la línea
            yMax: 30, // valor máximo de la línea
            borderColor: 'rgba(255, 99, 132, 0.7)',
            borderWidth: 2,
            label: {
              content: 'Temperatura Alta',
              enabled: true,
              position: 'center',
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function(value) {
            return value + '°C';
          },
        },
      },
    },
  };
  

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
      
      <h1 className="text-black text-3xl font-bold text-center">Pronóstico del Tiempo - Formosa, Argentina</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2 bg-white text-black shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader>
      <CardTitle className="text-5xl font-semibold">Condiciones actuales</CardTitle> {/* Título más grande */}
      <p className="text-1xl mb-2 text-black">{formattedDate}</p> {/* Fecha debajo del título, más pequeña */}
  </CardHeader>
  <CardContent>
    
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
      {getIcon(current.conditions) || <Droplet className="w-12 h-12 text-blue-500" />}

      <div>
          <p className="text-5xl font-extrabold">{current.temp}°C</p>
          <p className="text-xl">{currentCondition}</p>
        </div>
      </div>

    


      <div className="text-center md:text-right">
    
        <p className="text-xl mb-2">Sensación térmica: {current.feelslike}°C</p>
        <p className="text-xl mb-2">Humedad: {current.humidity}%</p>
        <p className="text-xl">Viento: {current.windspeed} km/h</p>
      </div>
    </div>
    
  </CardContent>
</Card>





<Card className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
  <CardHeader>
    <CardTitle className="text-xl font-semibold">Detalles</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center"><Sunrise className="mr-2 text-yellow-500" /> Amanecer</span>
        <span>{current.sunrise}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center"><Sunset className="mr-2 text-orange-500" /> Atardecer</span>
        <span>{current.sunset}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center"><Umbrella className="mr-2 text-blue-500" /> Precipitación</span>
        <span>{current.precip ? `${current.precip} mm` : "N/A"}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center"><Thermometer className="mr-2 text-red-500" /> Presión</span>
        <span>{current.pressure} hPa</span>
      </div>
    </div>
  </CardContent>
</Card>

        </div>

        <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Pronóstico por horas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex overflow-x-auto space-x-4 pb-4 bg-white rounded-lg p-4">
            {weatherData.days[0].hours.map((hour, index) => (
              <div key={index} className="flex flex-col items-center min-w-[100px] p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                <p className="font-semibold text-gray-800">{hour.datetime.slice(0, 5)}</p>
                {/* Usar la traducción en español para la condición */}
                <div>
                {getIcon(hour.conditions) || <Droplet className="w-8 h-8 text-blue-500" />}

                </div>
                <p className="text-lg font-bold text-gray-800">{hour.temp}°C</p>
                {/* Traducir la condición al español */}
                <p className="text-sm text-gray-600">
                  {conditionTranslations[hour.conditions] || hour.conditions}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {weatherData.days.slice(1, 9).map((day, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader>
              <CardTitle>
                    <span className="text-sm font-semibold leading-tight">
              {new Date(day.datetime).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
            </CardTitle>              
            </CardHeader>
            <CardContent>
  <div className="space-y-4">
    <div className="flex items-center justify-center">
      {getIcon(day.conditions)}
    </div>
    <div className="flex items-center justify-between">
      <span className="text-lg font-semibold text-red-500">{day.tempmax}°C</span>
      <span className="text-lg font-semibold text-blue-500">{day.tempmin}°C</span>
    </div>
  </div>
</CardContent>
</Card>

          ))}
        </div>

        <Card className="w-full lg:w-5/5 xl:w-4/4 shadow-lg">
  <CardHeader>
    <CardTitle className="text-2xl font-semibold">Gráfico de Temperaturas (15 Días)</CardTitle>
  </CardHeader>
  <CardContent>
    <div 
      style={{ 
        width: '1200px', 
        height: '600px', 
        backgroundColor: '#E0F7FA' // Color blanco tirando a celeste
      }}
    >
      <Line data={data} options={options} />
    </div>
  </CardContent>
</Card>




      </div>
    </div>
  )
}
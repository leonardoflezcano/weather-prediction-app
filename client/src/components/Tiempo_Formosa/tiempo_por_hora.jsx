import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../stilos/tiempo_por_hora.css';
import cloudy from '../../assets/estaciones_tiempo/clear.png';
import partlyCloudy from '../../assets/estaciones_tiempo/mist.png';
import mostlyClear from '../../assets/estaciones_tiempo/rain.png';

const Tiempo_por_hora = () => {
  const scrollRef = useRef(null);

  const forecast = [
    { time: 'Ahora', temp: '10°C', condition: 'Muy nublado', precip: '2%', wind: '15 km/h', icon: cloudy },
    { time: '1 PM', temp: '11°C', condition: 'Muy nublado', precip: '2%', wind: '15 km/h', icon: cloudy },
    { time: '2 PM', temp: '12°C', condition: 'Muy nublado', precip: '4%', wind: '15 km/h', icon: cloudy },
    { time: '3 PM', temp: '12°C', condition: 'Muy nublado', precip: '4%', wind: '15 km/h', icon: cloudy },
    { time: '4 PM', temp: '13°C', condition: 'Muy nublado', precip: '4%', wind: '16 km/h', icon: cloudy },
    { time: '5 PM', temp: '12°C', condition: 'Parcialmente soleado', precip: '5%', wind: '15 km/h', icon: partlyCloudy },
    { time: '6 PM', temp: '12°C', condition: 'Parcialmente soleado', precip: '5%', wind: '14 km/h', icon: partlyCloudy },
    { time: '7 PM', temp: '11°C', condition: 'Prácticamente despejado', precip: '3%', wind: '9 km/h', icon: mostlyClear },
    { time: '8 PM', temp: '11°C', condition: 'Prácticamente despejado', precip: '3%', wind: '9 km/h', icon: mostlyClear },
    { time: '9 PM', temp: '11°C', condition: 'Prácticamente despejado', precip: '3%', wind: '9 km/h', icon: mostlyClear },
    { time: '10 PM', temp: '11°C', condition: 'Prácticamente despejado', precip: '3%', wind: '9 km/h', icon: mostlyClear },
    { time: '11 PM', temp: '11°C', condition: 'Prácticamente despejado', precip: '3%', wind: '9 km/h', icon: mostlyClear },
    { time: '12 PM', temp: '11°C', condition: 'Prácticamente despejado', precip: '3%', wind: '9 km/h', icon: mostlyClear },
  ];

  return (

        <div className="hourly-forecast" ref={scrollRef}>
          {forecast.map((hour, index) => (
            <div key={index} className="hour">
              <img src={hour.icon} alt={hour.condition} />
              <p>{hour.temp}</p>
              <p>{hour.condition}</p>
              <p>{hour.precip}</p>
              <p>{hour.wind}</p>
              <p>{hour.time}</p>
            </div>
          ))}
        </div>
  );
};

export default Tiempo_por_hora;

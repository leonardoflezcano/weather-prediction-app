import React from 'react';
import styles from '../../stilos/estaciob.module.css'; 
import "../../stilos/main.css"


export default function Estaciones() {

  return (
    <div className={styles.estacionesContainer}>

<section className="mt-7">
<section>
<h2 className="text-2xl font-bold mb-4">Weather Stations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Station A",
                location: "Formosa City",
                temperature: 25,
                wind: 10,
                precipitation: 20,
                humidity: 60,
                airQuality: "Good",
              },
              {
                name: "Station B",
                location: "Clorinda",
                temperature: 27,
                wind: 12,
                precipitation: 15,
                humidity: 65,
                airQuality: "Good",
              },
              {
                name: "Station C",
                location: "Piran\u00E9",
                temperature: 23,
                wind: 8,
                precipitation: 25,
                humidity: 55,
                airQuality: "Moderate",
              },
              {
                name: "Station D",
                location: "Ingeniero Ju\u00E1rez",
                temperature: 26,
                wind: 11,
                precipitation: 18,
                humidity: 62,
                airQuality: "Good",
              },
              {
                name: "Station E",
                location: "Laguna Blanca",
                temperature: 24,
                wind: 9,
                precipitation: 22,
                humidity: 58,
                airQuality: "Good",
              },
              {
                name: "Station F",
                location: "Ibarreta",
                temperature: 25,
                wind: 10,
                precipitation: 20,
                humidity: 60,
                airQuality: "Good",
              },
            ].map((station) => (
              <div key={station.name} className="bg-[#6B5B95] text-white rounded-lg p-4">
                <h3 className="text-xl font-bold mb-2">{station.name}</h3>
                <p className="text-lg">{station.location}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <h4 className="text-lg font-bold mb-1">Temperature</h4>
                    <p className="text-2xl font-bold">{station.temperature}°C</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Wind</h4>
                    <p className="text-2xl font-bold">{station.wind} km/h</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Precipitation</h4>
                    <p className="text-2xl font-bold">{station.precipitation}%</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Humidity</h4>
                    <p className="text-2xl font-bold">{station.humidity}%</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Air Quality</h4>
                    <p className="text-2xl font-bold">{station.airQuality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        <h2 className={styles.title}>Ideal Weather</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <div className={`${styles.card} ${styles.cardTemperature}`}>
            <h3 className="text-xl font-bold mb-2">Temperature</h3>
            <p className="text-4xl font-bold">25°C</p>
          </div>
          <div className={`${styles.card} ${styles.cardWind}`}>
            <h3 className="text-xl font-bold mb-2">Wind</h3>
            <p className="text-4xl font-bold">10 km/h</p>
          </div>
          <div className={`${styles.card} ${styles.cardPrecipitation}`}>
            <h3 className="text-xl font-bold mb-2">Precipitation</h3>
            <p className="text-4xl font-bold">20 mm</p>
          </div>
          <div className={`${styles.card} ${styles.cardHumidity}`}>
            <h3 className="text-xl font-bold mb-2">Humidity</h3>
            <p className="text-4xl font-bold">60%</p>
          </div>
          <div className={`${styles.card} ${styles.cardAirQuality}`}>
            <h3 className="text-xl font-bold mb-2">Air Quality</h3>
            <p className="text-4xl font-bold">Good</p>
          </div>
        </div>
      </section>

        </section>
   
    </div>
  );
}

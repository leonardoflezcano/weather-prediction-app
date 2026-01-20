import React from 'react';
import WeatherCard from './WeatherCard';
import MiniMap from '../Mapa/MiniMap';
import '../../../src/stilos/tiempo_map.css';

function Tiempo_map({ weatherInfo }) {
    return (
        <div className="tiempo-map__container">
            <div className="tiempo-map__row">
                <div className="tiempo-card__col">
                    {weatherInfo ? (
                        <WeatherCard data={weatherInfo} />
                    ) : (
                        <p>Cargando información del tiempo...</p>
                    )}
                </div>
                <div className="tiempo-map__col">
                    <MiniMap />
                </div>
            </div>
        </div>
    );
}

export default Tiempo_map;

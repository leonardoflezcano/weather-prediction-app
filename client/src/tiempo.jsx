import React from 'react';
import WeatherForecast from "./components/Tiempo_Formosa/WeatherReport";
import Nav from './components/Navbar/Nav';
//import TiempoContenedor from './components/Tiempo_Formosa/tiempo_contenedor';
import Estaciones from './components/Info_estaciones/info_estaciones';
import Footer from './footer';

export function Tiempo() {
  return (
    <div style={{ backgroundColor: '#34495e' }} className='fondo'>
      <Nav />
      <WeatherForecast /> 
      <Footer></Footer>
    </div>
  );
}
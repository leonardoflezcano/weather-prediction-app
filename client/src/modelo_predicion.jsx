import React from 'react';
import PredictionForm from './components/Modelo_predicion/WeatherQuery'; // Importa sin llaves
import Nav from './components/Navbar/Nav';



function Modelo_predicion() {
  return (
    <div>
        <Nav />
        <PredictionForm />
       
    </div>
  );
}

export default Modelo_predicion;

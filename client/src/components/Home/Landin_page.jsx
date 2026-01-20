import React from 'react';
import { Link } from 'react-router-dom'; 
import { useTheme } from '../../contex/themaContext'; // Importa el hook useTheme
import "../../stilos/inicio.css"; 
import {Slider} from './slider';
import Ventana_clima from './venta_clima';
import Clima_manos from './clima_manos';
import Características_principales from './caracteristica_principales';


const Landing_page = ({ searchTerm }) => {
  const { theme, toggleTheme } = useTheme();  // Accede al tema y la función para cambiarlo

  return (
    <div className={`contenedor_landing ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>

      <Slider />
      <Ventana_clima />
      <Clima_manos />
      <Características_principales />

 
    </div>
  );
};

export default Landing_page;

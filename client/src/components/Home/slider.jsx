import { useState, useEffect } from 'react';
import "../../../src/stilos/Plantilla_slider2/css/style2.css";
import "../../stilos/Plantilla_slider2/css/bootstrap2.css";
import "../../stilos/Plantilla_slider2/css/responsive2.css";
import { Link } from 'react-router-dom';

export function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '../../../src/stilos/Plantilla_slider2/images/nubes.jpg',
    '../../../src/stilos/Plantilla_slider2/images/tormenta.jpg',
    '../../../src/stilos/Plantilla_slider2/images/estacion.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 13000); // Cambiar de imagen cada 13 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="contenedor_slider">
      <section className="slider_section position-relative">
        <div className="slider_bg-container"></div>
        <div className="slider-container">
          <div className="detail-box">
            <h1 style={{ fontSize: '3rem' }}>Descubre Nuestra Plataforma Meteorológica</h1>
            <p
              style={{
                fontSize: '1.25rem',
                lineHeight: '1.6',
                textAlign: 'justify', // Justifica el texto
              }}
            >
              Nuestro sistema proporciona información sobre el tiempo en la provincia de Formosa. 
              Se obtienen datos de 10 estaciones meteorológicas ubicadas a lo largo de la provincia. 
              La aplicación cuenta con dashboards, mapas de las estaciones, un modelo de predicción 
              con inteligencia artificial y noticias sobre el clima en diferentes localidades. La 
              aplicación mostrará datos como humedad, precipitaciones, calidad del aire, entre otros.
            </p>
            <div>
              <Link to="/contacto">
                <span
                  className="slider-link"
                  style={{
                    border: '2px solid #8A2BE2',  // Cambiar el borde a un violeta fuerte
                    borderRadius: '20px',
                    padding: '10px 20px',
                    color: 'white',  // Cambiar el color del texto a blanco
                    backgroundColor: '#8A2BE2',  // Fondo violeta fuerte
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  CONTACT US
                </span>
              </Link>
            </div>
          </div>
          <div className="img-box">
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide}
                alt="Slider"
                className={`img-fluid ${index === currentSlide ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

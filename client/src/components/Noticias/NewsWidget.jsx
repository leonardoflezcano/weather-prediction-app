import React, { useState, useEffect } from 'react';
import Comentario from '../comentarios/comentario';
import '../../../src/stilos/NewsWidget.css';

const NewsWidget = ({ searchTerm = '' }) => {
  const [articles, setArticles] = useState([]); // Noticias de la API
  const [showModal, setShowModal] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(null);

  useEffect(() => {
    // Obtener noticias desde la API
    // noticia del json:http://localhost:4000/api/noticia/all
    // noticia del scraping: http://127.0.0.1:5000/api/news

    fetch('http://localhost:4000/api/noticia/all')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
      })
      .catch(error => {
        console.error('Error al obtener los artículos:', error);
      });
  }, []);

  // Filtrar las noticias obtenidas de la API
  const filteredNews = articles.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (index) => {
    setCurrentNewsIndex(index);
    setShowModal(true);
  };

  return (
    <div className="news-widget">
      <h2 className="news-title">Noticias sobre el Tiempo en Formosa</h2>
      <div className="news-grid">
        {filteredNews.map((item, index) => (
          <div
            key={index}
            className="news-card"
            onClick={() => window.open(item.url, '_blank')} // Abrir la URL en una nueva pestaña
          >
            {/* Mostrar la imagen si está disponible */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="news-image"
                onError={(e) => e.target.src = 'https://via.placeholder.com/150'} // Imagen de respaldo
              />
            ) : (
              <img
                src="https://via.placeholder.com/150" // Imagen predeterminada
                alt="Imagen no disponible"
                className="news-image"
              />
            )}
            <div className="news-content">
              <h3 className="news-card-title">{item.title}</h3>
              <p className="news-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">
              {currentNewsIndex !== null && filteredNews[currentNewsIndex].title}
            </h3>
            <div className="modal-body">
              <Comentario />
            </div>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsWidget;

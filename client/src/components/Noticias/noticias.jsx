import React, { useState, useEffect } from 'react';
import '../../../src/stilos/NewsWidget.css';


export const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/news')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
      })
      .catch(error => {
        console.error('Error al obtener los artículos:', error);
      });
  }, []);

  const placeholderImage = 'https://www.noticiasformosa.com.ar/wp-content/themes/jnews/assets/img/jeg-empty.png';

  return (
    <div className="news-widget">
        <h2 className="news-title">Noticias sobre el Tiempo en Formosa</h2>
      <div className="news-grid">
        {articles.map((article, index) => (
          <div key={index} className="news-card">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
              {article.image && article.image !== placeholderImage ? (
                <img 
                  src={article.image} 
                  alt={article.title} 
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
                <h3 className="news-card-title">{article.title}</h3>
                <p className="news-description">{article.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import '../../stilos/Coments.css';

import likeIcon from '../../images/like.svg';
import dislikeIcon from '../../images/dislike.svg';
import profileIcon from '../../images/profile.svg';
import replyIcon from '../../images/reply.svg';
import shareIcon from '../../images/share.svg';

const CommentList = () => {
  const [comments, setComments] = useState([
    { id: 1, username: 'Juan Pérez', comment: 'Excelente página, muy útil para conocer el clima.', daysAgo: 2, likes: 5, dislikes: 1 },
    { id: 2, username: 'Ana Gómez', comment: 'Me gusta la precisión de las predicciones.', daysAgo: 5, likes: 3, dislikes: 0 },
    { id: 3, username: 'Pedro Martínez', comment: 'Podrían mejorar la interfaz pero las predicciones son acertadas.', daysAgo: 7, likes: 7, dislikes: 2 },
    { id: 4, username: 'Laura Rodríguez', comment: 'Ideal para planificar actividades al aire libre.', daysAgo: 10, likes: 2, dislikes: 0 },
    { id: 5, username: 'Diego López', comment: 'Necesito más detalles sobre la humedad relativa.', daysAgo: 12, likes: 4, dislikes: 1 },
    { id: 6, username: 'María González', comment: 'La mejor página para saber cómo estará el tiempo mañana.', daysAgo: 14, likes: 6, dislikes: 3 },
    { id: 7, username: 'Carlos Fernández', comment: 'Muy buena la información de la velocidad del viento.', daysAgo: 18, likes: 8, dislikes: 0 },
    { id: 8, username: 'Lucía Díaz', comment: 'No siempre coincide la predicción con la realidad.', daysAgo: 20, likes: 1, dislikes: 2 },
    { id: 9, username: 'Fernando Vargas', comment: 'Útil para estar preparado con antelación.', daysAgo: 22, likes: 5, dislikes: 1 },
    { id: 10, username: 'Elena Sánchez', comment: 'Falta información sobre la probabilidad de precipitaciones.', daysAgo: 25, likes: 3, dislikes: 0 },
    { id: 11, username: 'Martín Romero', comment: 'Las gráficas de temperatura son muy claras y útiles.', daysAgo: 28, likes: 4, dislikes: 1 },
    { id: 12, username: 'Sofía Álvarez', comment: 'Me gustaría ver más fotos de radar en tiempo real.', daysAgo: 30, likes: 2, dislikes: 0 },
    { id: 13, username: 'Gabriel Torres', comment: 'No sé si la información de la presión atmosférica es correcta.', daysAgo: 32, likes: 3, dislikes: 2 },
    { id: 14, username: 'Valentina Gutiérrez', comment: 'Sería genial tener una sección para consejos sobre cómo vestirse según el clima.', daysAgo: 35, likes: 6, dislikes: 0 },
    { id: 15, username: 'Julián Flores', comment: 'Muy completo el pronóstico extendido.', daysAgo: 40, likes: 7, dislikes: 3 },
  ]);

  const handleLike = (id) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleDislike = (id) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, dislikes: comment.dislikes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleReply = (id) => {
    console.log(`Responder al comentario con ID: ${id}`);
  };

  const handleShare = (id) => {
    console.log(`Compartir el comentario con ID: ${id}`);
  };

  return (
    <div className="comment-list-container">
      <h2>Comentarios</h2>
      {comments.map(comment => (
        <div key={comment.id} className="comment-container">
          <div className="user-info">
            <img className="profile-icon" src={profileIcon} alt="Profile" />
            <p className="username">{comment.username}</p>
          </div>
          <div className="comment-info">
            <p className="days-ago">{comment.daysAgo} días atrás</p>
          </div>
          <p className="comment-text">{comment.comment}</p>
          <div className="actions-container">
            <div className="like-dislike-container">
              <button className="like-button" onClick={() => handleLike(comment.id)}>
                <img className="icon" src={likeIcon} alt="Like" />
                <span>({comment.likes})</span>
              </button>
              <button className="dislike-button" onClick={() => handleDislike(comment.id)}>
                <img className="icon" src={dislikeIcon} alt="Dislike" />
                <span>({comment.dislikes})</span>
              </button>
            </div>
            <div className="reply-share-container">
              <button className="reply-button" onClick={() => handleReply(comment.id)}>
                <img className="icon" src={replyIcon} alt="Reply" />
                Responder
              </button>
              <button className="share-button" onClick={() => handleShare(comment.id)}>
                <img className="icon" src={shareIcon} alt="Share" />
                Compartir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
import React, { useState } from 'react';
import '../../stilos/Comentario.css'; // Asegúrate de importar tu archivo CSS
import CommentList from './CommentList.jsx'; // Importa el componente CommentList

function Comentario() {
  const [showComments, setShowComments] = useState(false); // Estado para mostrar comentarios

  // Función para mostrar los comentarios al hacer clic en "Ver comentarios anteriores"
  const handleShowComments = () => {
    setShowComments(true);
  };

  return (
    <div className="comentario-container">
      <h1>Comentarios</h1>
      <textarea className="form-control" rows="3" placeholder="Escribe tu comentario aquí..."></textarea>
      <button type="button" className="btn btn-primary mt-2">Enviar</button>
      <button type="button" className="btn btn-link view-comments-button mt-4" onClick={handleShowComments}>
        Ver comentarios anteriores
      </button>

      {/* Renderizado condicional del componente CommentList */}
      {showComments && <CommentList />}
    </div>
  );
}

export default Comentario;

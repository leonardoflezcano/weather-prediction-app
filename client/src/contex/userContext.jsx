// userContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Crear el contexto
const UserContext = createContext();

// Hook personalizado para usar el UserContext
export const useUser = () => useContext(UserContext);

// Función para obtener la información del usuario
const fetchUserInfo = async (token) => {
  try {
    const response = await axios.get("http://localhost:4000/api/auth/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("No se pudo obtener la información del usuario");
  }
};

// Proveedor del contexto
export const UserProvider = ({ children }) => {

  const [userData, setUserData] = useState ({
    email: 'email@example.com',
    fotoUser: '../../../src/images/usuario.jpg',
    nombre_completo: 'Nombre de Usuario',
    username: 'Username',
    id: 'id del usuario'
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token)
        .then(data => {
          setUserData({
            email: data.email,
            fotoUser: data.fotoUser,
            username: data.username,
            nombre_completo: data.nombre_completo,
            id: data._id
          });
        })
        .catch(error => console.error("Error fetching user info:", error.message));
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

import request from 'supertest'; 
import { app } from '../server.js';   

// Función para probar el GET /api/auth 
const allUserRegistrados = () => {
  describe('Pruebas de la ruta GET /api/auth', () => {
    it('Debería responder con un 200 en /api/auth', async () => {
      const response = await request(app).get('/api/auth');
      expect(response.status).toBe(200); 
    });
  });
};

// Función para probar el GET /api/noticia/all
const allNoticias = () => {
  describe('Pruebas de la ruta GET /api/noticia/all', () => {
    it('Debería responder con un 200 en /api/noticia/all', async () => {
      const response = await request(app).get('/api/noticia/all');
      expect(response.status).toBe(200); 
    });
  });
};

// Función para probar el POST /api/auth/login
const loginUser = () => {
  describe('Pruebas de la ruta POST /api/auth/login', () => {
    it('Debería responder con un 200 en /api/auth/login', async () => {
      // Datos de login para el usuario
      const credenciales = {
        email: 'bresanovichaxel321@gmail.com',
        password: '12345678',
      };

      // Hacemos la solicitud POST al endpoint de login
      const response = await request(app)
        .post('/api/auth/login')
        .send(credenciales);  // Enviamos las credenciales del usuario

      // Comprobamos que el estado de la respuesta sea 200 (OK)
      expect(response.status).toBe(200);
      // También podemos verificar que la respuesta tenga un token o algún tipo de datos de autenticación
      expect(response.body).toHaveProperty('token');
    });
  });
};

// Ejecutar las funciones de prueba
describe('Pruebas de las rutas de la API', () => {
  allUserRegistrados();
  allNoticias();
  loginUser();
}, 10000);  // Asegúrate de aumentar el tiempo de espera si es necesario

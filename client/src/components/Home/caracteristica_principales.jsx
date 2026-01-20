import { Link } from "react-router-dom";
import { useTheme } from '../../contex/themaContext';  // Importa el hook useTheme

export default function Caracteristicas_principales() {
  const { theme } = useTheme(); 

  return (
    <div className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      <main className="container mx-auto py-12 md:py-20 px-4 md:px-6">
        
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
            Descubre nuestro producto revolucionario
          </h1>
          <p className={`text-lg md:text-xl max-w-[700px] mx-auto ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
            Nuestra solución innovadora te ayudará a conocer el clima de manera eficiente y efectiva.
          </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/estaciones">              
            <div className="bg-[#f5f5f5] dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden" id="caracteristica">
              <h3 className="text-2xl font-bold p-6 text-white">📡 Información Detallada de las Estaciones</h3>
              <img
                src="../../../src/images/panel.jpg"
                alt="Característica 1"
                width="400"
                height="240"
                className="w-full h-60 object-cover"
                style={{ aspectRatio: "400/240", objectFit: "cover" }}
              />
              <div className="p-6 space-y-4">
                <p className="text-white">
                Accede a datos meteorológicos precisos obtenidos de nuestras 10 estaciones. Mantente informado con la información más actualizada y relevante.
                </p>
              </div>
            </div>
            </Link>

            <Link to="/noticias">              
            <div className="bg-[#f5f5f5] dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden" id="caracteristica">
              <h3 className="text-2xl font-bold p-6 text-white">📰 Noticias Climáticas Locales</h3>
              <img
                src="../../../src/images/Noticas_animado.jpg"
                alt="Característica 2"
                width="400"
                height="240"
                className="w-full h-60 object-cover"
                style={{ aspectRatio: "400/240", objectFit: "cover" }}
                />
              <div className="p-6 space-y-4">
                <p className="text-white">
                Mantente informado sobre eventos climáticos importantes en tu localidad. Desde alertas por tormentas hasta consejos para días calurosos, te mantenemos al día con información relevante.
                </p>
              </div>
            </div>
            </Link>
  
            <Link to="/mapa">              
            <div className="bg-[#f5f5f5] dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden" id="caracteristica">
              <h3 className="text-2xl font-bold p-6 text-white">🗺️ Mapa Interactivo de Estaciones</h3>
              <img
                src="../../../src/images/Mapa_formosa.jpg"
                alt="Característica 3"
                width="400"
                height="240"
                className="w-full h-60 object-cover"
                style={{ aspectRatio: "400/240", objectFit: "cover" }}
              />
              <div className="p-6 space-y-4">
                <p className="text-white">
                Explora la ubicación de nuestras 10 estaciones meteorológicas. Haz clic en cada una para obtener información detallada sobre su ubicación y los datos que recopila.
                </p>
              </div>
            </div>
            </Link>
  
            <Link to="/modelo_prediccion">              
            <div className="bg-[#f5f5f5] dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden" id="caracteristica">
              <h3 className="text-2xl font-bold p-6 text-white">🤖 Predicción con Inteligencia Artificial</h3>
              <img
                src="../../../src/images/IA.avif"
                alt="Característica 4"
                width="400"
                height="240"
                className="w-full h-60 object-cover"
                style={{ aspectRatio: "400/240", objectFit: "cover" }}
                />
              <div className="p-6 space-y-4">
                <p className="text-white">
                Nuestro modelo de IA analiza patrones climáticos históricos para ofrecerte predicciones precisas.
                </p>
              </div>
            </div>
            </Link>
  
            <Link to="/estadistica">              
            <div className="bg-[#f5f5f5] dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden" id="caracteristica">
              <h3 className="text-2xl font-bold p-6 text-white">📊 Dashboards Intuitivos y faciles de usar</h3>
              <img
                src="../../../src/images/animado_estadistica.jpg"
                alt="Característica 5"
                width="400"
                height="240"
                className="w-full h-60 object-cover"
                style={{ aspectRatio: "400/240", objectFit: "cover" }}
                />
              <div className="p-6 space-y-4">
                <p className="text-white">
                Visualiza los datos meteorológicos de forma clara y sencilla. Nuestros dashboards te permiten entender el clima de un vistazo.
                </p>
              </div>
            </div>
            </Link>

            <Link to="/Weather">            
            <div className="bg-[#f5f5f5] dark:bg-[#2a2a2a] border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden" id="caracteristica">
              <h3 className="text-2xl font-bold p-6 text-white"> ☀️Mostrar los datos del clima generales y especificos</h3>
              <img
                src="../../../src/images/wheter_animado.avif"
                alt="Característica 6"
                width="400"
                height="240"
                className="w-full h-60 object-cover"
                style={{ aspectRatio: "400/240", objectFit: "cover" }}
                />
              <div className="p-6 space-y-4">
                <p className="text-white">
                Visualiza los datos meteorológicos de forma clara y sencilla. Nuestros dashboards te permiten entender el clima de un vistazo.
                </p>
              </div>
            </div>
            </Link>

          </div>
        </main>
      </div>
    );
  }
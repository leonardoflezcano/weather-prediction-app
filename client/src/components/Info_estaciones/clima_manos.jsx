import "../../stilos/main.css";

export default function Clima_manos() {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#6B46C1] text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Red Agrometeorológicas de Formosa</h2>
              <p className="max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experimenta el poder de datos meteorológicos en tiempo real, pronósticos precisos e información completa de las estaciones con nuestra aplicación de vanguardia.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                    <ThermometerIcon className="w-5 h-5 text-[#6B46C1]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Datos en Tiempo Real</h3>
                    <p className="text-white/80 text-sm">
                      Recibe actualizaciones minuto a minuto desde 10 estaciones meteorológicas en Formosa.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                    <CloudyIcon className="w-5 h-5 text-[#6B46C1]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Pronósticos Precisos</h3>
                    <p className="text-white/80 text-sm">
                      Confía en nuestro pronóstico avanzado basado en IA para predicciones precisas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                    <AirVentIcon className="w-5 h-5 text-[#6B46C1]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Calidad del Aire</h3>
                    <p className="text-white/80 text-sm">Mantente informado sobre la calidad del aire en tu área local.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                    <DatabaseIcon className="w-5 h-5 text-[#6B46C1]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Datos de Estaciones</h3>
                    <p className="text-white/80 text-sm">Accede a información detallada de cada estación meteorológica.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                    <CalculatorIcon className="w-5 h-5 text-[#6B46C1]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Estadísticas Completas</h3>
                    <p className="text-white/80 text-sm">Analiza datos meteorológicos con nuestras herramientas estadísticas avanzadas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                    <NewspaperIcon className="w-5 h-5 text-[#6B46C1]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Noticias Meteorológicas Locales</h3>
                    <p className="text-white/80 text-sm">Mantente al día con las últimas noticias y actualizaciones meteorológicas.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-full">
              <img src="../../../src/images/manos.jpg" alt="Mapa de Formosa" className="object-cover w-full h-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  

  
  function AirVentIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 8h12" />
        <path d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12" />
        <path d="M6.6 15.6A2 2 0 1 0 10 17v-5" />
      </svg>
    )
  }
  
  
  function CalculatorIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <line x1="8" x2="16" y1="6" y2="6" />
        <line x1="16" x2="16" y1="14" y2="18" />
        <path d="M16 10h.01" />
        <path d="M12 10h.01" />
        <path d="M8 10h.01" />
        <path d="M12 14h.01" />
        <path d="M8 14h.01" />
        <path d="M12 18h.01" />
        <path d="M8 18h.01" />
      </svg>
    )
  }
  
  
  function CloudyIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5" />
      </svg>
    )
  }
  
  
  function DatabaseIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </svg>
    )
  }
  
  
  function NewspaperIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" />
        <path d="M15 18h-5" />
        <path d="M10 6h8v4h-8V6Z" />
      </svg>
    )
  }
  
  
  function ThermometerIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      </svg>
    )
  }
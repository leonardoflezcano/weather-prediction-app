import "../../stilos/main.css";

export default function Ventana_clima() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 ventana">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch">
        {/* Primera columna: Texto e imagen */}
        <div className="flex-1 space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">Tu Ventana al Clima Provincial</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Mantente informado sobre las condiciones meteorológicas en la provincia de Formosa. Nuestra red de
            estaciones te brinda datos precisos y actualizados para que puedas planificar tus actividades con confianza.
          </p>
          <img
            src="../../../src/images/pensando.jpg"
            alt="Persona pensando"
            className="w-full h-auto max-w-sm mx-auto rounded-lg object-cover"
            style={{ aspectRatio: "500/500", objectFit: "cover" }}
          />
        </div>

        {/* Segunda columna: Información meteorológica */}
        <div className="flex-1 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 bg-background p-6 sm:p-8 rounded-lg shadow-lg h-full">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <span role="img" aria-label="Thermometer">🌡️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Temperatura</h3>
                <p className="text-muted-foreground text-sm">Monitorea los cambios de temperatura.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <span role="img" aria-label="Rain">🌧️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Precipitación</h3>
                <p className="text-muted-foreground text-sm">Conoce los niveles de lluvia y nieve.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <span role="img" aria-label="Humidity">💧</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Humedad</h3>
                <p className="text-muted-foreground text-sm">Monitorea los niveles de humedad.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <span role="img" aria-label="Wind">💨</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Viento</h3>
                <p className="text-muted-foreground text-sm">Conoce la velocidad y dirección del viento.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-full p-2">
                <span role="img" aria-label="Pressure">🌫️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Presión Atmosférica</h3>
                <p className="text-muted-foreground text-sm">Monitorea los cambios en la presión.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

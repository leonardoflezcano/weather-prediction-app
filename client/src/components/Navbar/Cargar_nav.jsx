import React, {useEffect} from 'react'

function Cargar_nav() {

    useEffect(() => {
        const loadScripts = async () => {
          const loadScript = (src) => {
            return new Promise((resolve, reject) => {
              const script = document.createElement("script");
              script.src = src;
              script.async = true;
              script.onload = resolve;
              script.onerror = reject;
              document.body.appendChild(script);
            });
          };
    
          try {
            await loadScript("../../../src/stilos/Plantilla_slider/js/jquery-3.4.1.min.js");
            await loadScript("../../../src/stilos/Plantilla_slider/js/bootstrap.js");
          } catch (error) {
            console.error("Error loading scripts:", error);
          }
        };
    
        loadScripts();
    
        // Limpiar los scripts cuando el componente se desmonte
        return () => {
          const scripts = document.querySelectorAll('script[src*="jquery"], script[src*="bootstrap"]');
          scripts.forEach(script => document.body.removeChild(script));
        };
      }, []);
      
  return (
    <div>
      
    </div>
  )
}

export default Cargar_nav
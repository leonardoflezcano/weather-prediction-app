import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import "../../stilos/estadistica.css";
import { NavBar } from "../../components/Navbar/navBar";
import { Link } from 'react-router-dom';
import { loadGoogleCharts, 
  drawColumnChart_11, drawPieChart_11,  drawLineChart_11,
  drawColumnChart_1, drawPieChart_1,  drawLineChart_1,
  drawLineChart_2, drawColumnChart_2, drawPieChart_2, 
  drawPieChart_3, drawLineChart_3, drawColumnChart_3,
  drawColumnChart_4, drawPieChart_4, drawLineChart_4, } from './graficos';

function GeneracionEstadistica() {
  const [imagenSeleccionada2, setImagenSeleccionada2] = useState('../src/assets/Estadistica/temperatura.jpg');
  const [imagenSeleccionada4, setImagenSeleccionada4] = useState('../src/assets/Estadistica/tiempo_real_arena.jpg');

    const datos_analizar = (event) => {
        const valor = event.target.value;
        switch (valor) {
            case '1':
                setImagenSeleccionada2('../src/assets/Estadistica/temperatura.jpg');
                break;
            case '2':
                setImagenSeleccionada2('../src/assets/Estadistica/humedad.jpg');
                break;
            case '3':
                setImagenSeleccionada2('../src/assets/Estadistica/precipatacion.jpg');
                break;
            case '4':
                setImagenSeleccionada2('../src/assets/Estadistica/viento.jpg');
                break;
            default:
                break;
        }
    };

    const tiempo_dato = (event) => {
      const valor = event.target.value;
      switch (valor) {
          case '1':
              setImagenSeleccionada4('../src/assets/Estadistica/tiempo_real_arena.jpg');
              break;
          case '2':
              setImagenSeleccionada4('../src/assets/Estadistica/corto_plazo.jpg'); // Cambia por la ruta correcta de la imagen de humedad para el cuarto div
              break;
          case '3':
              setImagenSeleccionada4('../src/assets/Estadistica/mediano_plazo.jpg'); // Cambia por la ruta correcta de la imagen de precipitación para el cuarto div
              break;
          case '4':
              setImagenSeleccionada4('../src/assets/Estadistica/largo_plazo.jpg'); // Cambia por la ruta correcta de la imagen de viento para el cuarto div
              break;
          default:
              break;
      }
  };

  useEffect(() => {
    loadGoogleCharts(drawCharts);
  }, []);

  const drawCharts = () => {
    drawColumnChart_11('column_chart_11');
    drawPieChart_11('pie_chart_11');
    drawLineChart_11('curve_chart_11');

    drawColumnChart_1('column_chart_1');
    drawPieChart_1('pie_chart_1');
    drawLineChart_1('curve_chart_1');

    drawColumnChart_2('column_chart_2');
    drawPieChart_2('pie_chart_2');
    drawLineChart_2('curve_chart_2');

    drawColumnChart_3('column_chart_3');
    drawPieChart_3('pie_chart_3');
    drawLineChart_3('curve_chart_3');

    drawColumnChart_4('column_chart_4');
    drawPieChart_4('pie_chart_4');
    drawLineChart_4('curve_chart_4');
  };

  return (
    
    <div style={{ backgroundColor: '#34495e' }} className="contenedor">
      <NavBar></NavBar>
      <h1 className='Title_estadistica'>Estadística en tiempo real</h1>
      <Helmet>
        <script src="https://www.gstatic.com/charts/loader.js"></script>
      </Helmet>

      <div className="contenedor_select">
                <div className="columna">
                    <h2 className='subtitulo'>Datos a Analizar</h2>
                    <select className="form-select" aria-label="Default select example" onChange={datos_analizar}>
                        <option value="1">Temperatura</option>
                        <option value="2">Humedad</option>
                        <option value="3">Precipitación</option>
                        <option value="4">Viento</option>
                    </select>
                </div>
                <div className="columna">
                    <h2 className='subtitulo'>Tiempo de los Datos</h2>
                    <select className="form-select" aria-label="Default select example" onChange={tiempo_dato}>
                        <option value="1">Tiempo real</option>
                        <option value="2">Corto plazo</option>
                        <option value="3">Mediano plazo</option>
                        <option value="4">Largo plazo</option>
                    </select>
                </div>
            </div>

      <div className="contenedor_vista_estadistica">
        <div className="estadistica_figura">
          <img src="../src/assets/Estadistica/Estadistica.jpg" alt="estadistica" />
        </div>
        <div className="estadistica_figura">
          <img src={imagenSeleccionada2} alt="estadistica" />
        </div>
        <div className="estadistica_figura">
          <img src="../src/assets/Estadistica/estadistica_aumento.jpg" alt="estadistica" />
        </div>
        <div className="estadistica_figura">
          <img src={imagenSeleccionada4} alt="estadistica" />
        </div>
      </div>

      <h1 className='subtitulo'>Generales:</h1>

 {/* General */}
 <div className="contenedor_estadistica">
        <div id="column_chart_11"></div>
        <div className="grafico_figura">
          <img src="../src/assets/general.jpg" alt="Map" />
        </div>
        <div id="pie_chart_11"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">25</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">40</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">3</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_11"></div>
      </div>

      <h1 className='subtitulo'>Específicas:</h1>

      {/* 1 */}
        <h2 style={{ width: '100%', color: 'white' }}>Estación de Laguna Yema</h2>
      <div className="contenedor_estadistica">
        <div id="column_chart_1"></div>
        <div className="grafico_figura">
          <img src="../src/assets/1.jpg" alt="Map" />
        </div>
        <div id="pie_chart_1"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">29</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">41</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">0</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">32</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_1"></div>
      </div>

      {/* 2 */}
      <h2 style={{ width: '100%', color: 'white' }}>Estación de Misión Tacaaglé</h2>
      <div className="contenedor_estadistica">
        <div id="column_chart_2"></div>
        <div className="grafico_figura">
          <img src="../src/assets/2.jpg" alt="Map" />
        </div>
        <div id="pie_chart_2"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">25</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">35</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">15</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">27</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_2"></div>
      </div>

      {/* 3 */}
      <h2 style={{ width: '100%', color: 'white' }}>Estación del polo científico</h2>
      <div className="contenedor_estadistica">
        <div id="column_chart_3"></div>
        <div className="grafico_figura">
          <img src="../src/assets/3.jpg" alt="Map" />
        </div>
        <div id="pie_chart_3"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">20</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">30</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">10</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">22</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_3"></div>
      </div>

      {/* 4 */}
      <h2 style={{ width: '100%', color: 'white' }}>Estación El Colorado</h2>
      <div className="contenedor_estadistica">
        <div id="column_chart_4"></div>
        <div className="grafico_figura">
          <img src="../src/assets/4.jpg" alt="Map" />
        </div>
        <div id="pie_chart_4"></div>
        <div id="temp_table_container">
          <table id="temp_table">
            <thead>
              <tr>
                <th>Indicador</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperatura Promedio</td>
                <td id="avg_temp">18</td>
              </tr>
              <tr>
                <td>Temperatura Máxima</td>
                <td id="max_temp">28</td>
              </tr>
              <tr>
                <td>Temperatura Mínima</td>
                <td id="min_temp">8</td>
              </tr>
              <tr>
                <td>Media de Temperatura</td>
                <td id="median_temp">20</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="curve_chart_4"></div>
      </div>

    </div>
  );
}

export default GeneracionEstadistica;

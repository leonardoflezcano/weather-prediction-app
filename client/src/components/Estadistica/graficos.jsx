export const loadGoogleCharts = (callback) => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.onload = () => {
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(callback);
    };
    document.body.appendChild(script);
  };
  
  const drawChart = (elementId, chartType, dataArr, options) => {
    const data = google.visualization.arrayToDataTable(dataArr);
    let chart;
    switch (chartType) {
      case 'ColumnChart':
        chart = new google.visualization.ColumnChart(document.getElementById(elementId));
        break;
      case 'PieChart':
        chart = new google.visualization.PieChart(document.getElementById(elementId));
        break;
      case 'LineChart':
        chart = new google.visualization.LineChart(document.getElementById(elementId));
        break;
      default:
        return;
    }
    chart.draw(data, options);
  };
  
  export const drawColumnChart_1 = (elementId) => {
    drawChart(elementId, 'ColumnChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 22],
      ['Martes', 24],
      ['Miércoles', 21],
      ['Jueves', 23],
      ['Viernes', 25],
      ['Sábado', 26],
      ['Domingo', 24]
    ], {
      title: 'Temperatura durante la semana',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '70%', height: '70%' }
    });
  };
  
  export const drawPieChart_1 = (elementId) => {
    drawChart(elementId, 'PieChart', [
      ['Día', 'LLuvia'],
      ['Lunes', 22],
      ['Martes', 24],
      ['Miércoles', 21],
      ['Jueves', 23],
      ['Viernes', 25],
      ['Sábado', 26],
      ['Domingo', 30]
    ], {
      title: 'Porcentaje de lluvia de la semana',
      is3D: true,
      chartArea: { width: '100%', height: '70%' }
    });
  };
  
  export const drawLineChart_1 = (elementId) => {
    drawChart(elementId, 'LineChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 22],
      ['Martes', 24],
      ['Miércoles', 21],
      ['Jueves', 33],
      ['Viernes', 35],
      ['Sábado', 26],
      ['Domingo', 14]
    ], {
      title: 'Temperatura durante la semana',
      curveType: 'function',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '90%', height: '50%' }
    });
  };
  
  // Define y exporta las funciones adicionales
  export const drawColumnChart_2 = (elementId) => {
    drawChart(elementId, 'ColumnChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 18],
      ['Martes', 20],
      ['Miércoles', 19],
      ['Jueves', 21],
      ['Viernes', 22],
      ['Sábado', 23],
      ['Domingo', 20]
    ], {
      title: 'Temperatura durante la semana (Gráfico 2)',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '80%', height: '70%' }
    });
  };
  
  export const drawPieChart_2 = (elementId) => {
    drawChart(elementId, 'PieChart', [
      ['Día', 'LLuvia'],
      ['Lunes', 20],
      ['Martes', 22],
      ['Miércoles', 19],
      ['Jueves', 21],
      ['Viernes', 23],
      ['Sábado', 24],
      ['Domingo', 22]
    ], {
      title: 'Porcentaje de lluvia de la semana (Gráfico 2)',
      is3D: true,
      chartArea: { width: '100%', height: '70%' }
    });
  };
  
  export const drawLineChart_2 = (elementId) => {
    drawChart(elementId, 'LineChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 12],
      ['Martes', 22],
      ['Miércoles', 29],
      ['Jueves', 21],
      ['Viernes', 22],
      ['Sábado', 23],
      ['Domingo', 30]
    ], {
      title: 'Temperatura durante la semana (Gráfico 2)',
      curveType: 'function',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '90%', height: '50%' }
    });
  };
  
  // Define y exporta las funciones adicionales
  export const drawColumnChart_3 = (elementId) => {
    drawChart(elementId, 'ColumnChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 16],
      ['Martes', 28],
      ['Miércoles', 17],
      ['Jueves', 19],
      ['Viernes', 30],
      ['Sábado', 21],
      ['Domingo', 18]
    ], {
      title: 'Temperatura durante la semana (Gráfico 3)',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '80%', height: '70%' }
    });
  };
  
  export const drawPieChart_3 = (elementId) => {
    drawChart(elementId, 'PieChart', [
      ['Día', 'LLuvia'],
      ['Lunes', 28],
      ['Martes', 20],
      ['Miércoles', 17],
      ['Jueves', 19],
      ['Viernes', 11],
      ['Sábado', 22],
      ['Domingo', 30]
    ], {
      title: 'Porcentaje de lluvia de la semana (Gráfico 3)',
      is3D: true,
      chartArea: { width: '100%', height: '70%' }
    });
  };
  
  export const drawLineChart_3 = (elementId) => {
    drawChart(elementId, 'LineChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 26],
      ['Martes', 28],
      ['Miércoles', 17],
      ['Jueves', 19],
      ['Viernes', 30],
      ['Sábado', 21],
      ['Domingo', 18]
    ], {
      title: 'Temperatura durante la semana (Gráfico 3)',
      curveType: 'function',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '90%', height: '50%' }
    });
  };
  
  export const drawColumnChart_4 = (elementId) => {
    drawChart(elementId, 'ColumnChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 15],
      ['Martes', 17],
      ['Miércoles', 16],
      ['Jueves', 18],
      ['Viernes', 19],
      ['Sábado', 20],
      ['Domingo', 17]
    ], {
      title: 'Temperatura durante la semana (Gráfico 4)',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '80%', height: '70%' }
    });
  };
  
  export const drawPieChart_4 = (elementId) => {
    drawChart(elementId, 'PieChart', [
      ['Día', 'LLuvia'],
      ['Lunes', 15],
      ['Martes', 17],
      ['Miércoles', 16],
      ['Jueves', 18],
      ['Viernes', 20],
      ['Sábado', 5],
      ['Domingo', 15]
    ], {
      title: 'Porcentaje de lluvia de la semana (Gráfico 4)',
      is3D: true,
      chartArea: { width: '100%', height: '70%' }
    });
  };
  
  export const drawLineChart_4 = (elementId) => {
    drawChart(elementId, 'LineChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 31],
      ['Martes', 27],
      ['Miércoles', 16],
      ['Jueves', 18],
      ['Viernes', 29],
      ['Sábado', 20],
      ['Domingo', 17]
    ], {
      title: 'Temperatura durante la semana (Gráfico 4)',
      curveType: 'function',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '90%', height: '50%' }
    });
  };
  
  export const drawColumnChart_11 = (elementId) => {
    drawChart(elementId, 'ColumnChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 14],
      ['Martes', 16],
      ['Miércoles', 15],
      ['Jueves', 17],
      ['Viernes', 18],
      ['Sábado', 19],
      ['Domingo', 16]
    ], {
      title: 'Temperatura durante la semana (Gráfico 5)',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '70%', height: '70%' }
    });
  };
  
  export const drawPieChart_11 = (elementId) => {
    drawChart(elementId, 'PieChart', [
      ['Día', 'LLuvia'],
      ['Lunes', 14],
      ['Martes', 16],
      ['Miércoles', 15],
      ['Jueves', 17],
      ['Viernes', 18],
      ['Sábado', 19],
      ['Domingo', 16]
    ], {
      title: 'Porcentaje de lluvia de la semana (Gráfico 5)',
      is3D: true,
      chartArea: { width: '100%', height: '70%' }
    });
  };
  
  export const drawLineChart_11 = (elementId) => {
    drawChart(elementId, 'LineChart', [
      ['Día', 'Temperatura (°C)'],
      ['Lunes', 14],
      ['Martes', 16],
      ['Miércoles', 15],
      ['Jueves', 17],
      ['Viernes', 18],
      ['Sábado', 19],
      ['Domingo', 16]
    ], {
      title: 'Temperatura durante la semana (Gráfico 5)',
      curveType: 'function',
      legend: { position: 'bottom' },
      hAxis: { title: 'Día' },
      vAxis: { title: 'Temperatura (°C)' },
      chartArea: { width: '90%', height: '50%' }
    });
  };
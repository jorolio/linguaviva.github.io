document.addEventListener('DOMContentLoaded', () => {
    const analyzeButton = document.getElementById('analyzeButton');
    const inputText = document.getElementById('inputText');
    const resultsSection = document.getElementById('resultsSection');
    const finalScore = document.getElementById('finalScore');
    const resultsChart = document.getElementById('resultsChart').getContext('2d');
    let chartInstance = null;
  
    analyzeButton.addEventListener('click', () => {
      const text = inputText.value.trim();
      if (text === '') {
        alert('Por favor, ingresa una frase para analizar.');
        return;
      }
  
      // Simular análisis gramatical (reemplazar con llamada al backend en el futuro)
      const simulatedResponse = analizarFrase(text);
      
      // Mostrar resultados
      mostrarResultados(simulatedResponse);
    });
  
    function analizarFrase(frase) {
      // Esta función simula el análisis gramatical.
      // En una implementación real, enviarías una solicitud al backend aquí.
      // Por ahora, devolvemos una respuesta simulada basada en el ejemplo del usuario.
  
      // Ejemplo simple: contar palabras por tipo (simplificado)
      // En realidad, necesitarías un análisis gramatical más complejo.
  
      // Nota: Este es un análisis muy básico y debe ser reemplazado por uno real.
      const palabras = frase.split(/\s+/);
      let verbos = 0, sustantivos = 0, adjetivos = 0, adverbios = 0;
      let pronombres = 0, preposiciones = 0, articulos = 0, signosPuntuacion = 0;
      let puntoSeguida = 0, puntoAparte = 0;
  
      // Listas simplificadas para la demostración
      const listaVerbos = ['comió', 'diseñó', 'se bañan', 'rugían', 'son'];
      const listaSustantivos = ['perro', 'alimento', 'arquitecto', 'edificio', 'osos', 'río', 'autódromo', 'motores', 'vinos', 'Mendoza'];
      const listaAdjetivos = ['turbulento', 'mejores'];
      const listaAdverbios = ['cuidadosamente'];
      const listaPronombres = ['él', 'ella', 'ellos', 'ellas'];
      const listaPreposiciones = ['a', 'en', 'de', 'con'];
      const listaArticulos = ['el', 'la', 'los', 'las'];
      const listaSignos = ['.', ',', ';', ':', '!', '?'];
  
      palabras.forEach(palabra => {
        const cleanPalabra = palabra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();
        if (listaVerbos.includes(cleanPalabra)) verbos++;
        if (listaSustantivos.includes(cleanPalabra)) sustantivos++;
        if (listaAdjetivos.includes(cleanPalabra)) adjetivos++;
        if (listaAdverbios.includes(cleanPalabra)) adverbios++;
        if (listaPronombres.includes(cleanPalabra)) pronombres++;
        if (listaPreposiciones.includes(cleanPalabra)) preposiciones++;
        if (listaArticulos.includes(cleanPalabra)) articulos++;
        if (listaSignos.includes(palabra.slice(-1))) {
          signosPuntuacion++;
          if (palabra.slice(-1) === '.') {
            puntoSeguida++;
          }
          if (palabra.slice(-1) === ';' || palabra.slice(-1) === ':') {
            puntoAparte++;
          }
        }
      });
  
      const totalElementos = verbos + sustantivos + adjetivos + adverbios + pronombres + preposiciones + articulos + signosPuntuacion;
  
      const puntajeTotal = (verbos * 10) +
                           (sustantivos * 9) +
                           (adjetivos * 8) +
                           (adverbios * 7) +
                           (pronombres * 6) +
                           (preposiciones * 5) +
                           (articulos * 4) +
                           (signosPuntuacion * 3) +
                           (puntoSeguida * 2) +
                           (puntoAparte * 1);
  
      const coeficiente = totalElementos > 0 ? (puntajeTotal / totalElementos).toFixed(2) : 0;
  
      return {
        verbos,
        sustantivos,
        adjetivos,
        adverbios,
        pronombres,
        preposiciones,
        articulos,
        signosPuntuacion,
        puntoSeguida,
        puntoAparte,
        coeficiente
      };
    }
  
    function mostrarResultados(datos) {
      // Mostrar la sección de resultados
      resultsSection.style.display = 'block';
      finalScore.textContent = datos.coeficiente;
  
      // Datos para el gráfico
      const chartData = {
        labels: ['Verbos', 'Sustantivos', 'Adjetivos', 'Adverbios', 'Pronombres', 'Preposiciones', 'Artículos', 'Signos Puntuación'],
        datasets: [{
          label: 'Cantidad',
          data: [
            datos.verbos,
            datos.sustantivos,
            datos.adjetivos,
            datos.adverbios,
            datos.pronombres,
            datos.preposiciones,
            datos.articulos,
            datos.signosPuntuacion
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(199, 199, 199, 0.6)',
            'rgba(83, 102, 255, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(83, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      };
  
      // Opciones del gráfico
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      };
  
      // Si ya existe un gráfico, lo destruimos antes de crear uno nuevo
      if (chartInstance) {
        chartInstance.destroy();
      }
  
      // Crear el gráfico
      chartInstance = new Chart(resultsChart, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }
  });
  
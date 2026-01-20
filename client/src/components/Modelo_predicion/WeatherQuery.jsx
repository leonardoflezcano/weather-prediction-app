import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpCircle, Sun, Cloud, CloudRain, Wind, Loader, Trash, Download } from 'lucide-react'
import { FaRobot } from 'react-icons/fa'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const FormoWeatherAIModerno = () => {
  const [showWeatherData, setShowWeatherData] = useState(false)
  const [showChart, setShowChart] = useState(false)
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    humidity: null,
    precipitation: null,
  })

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Humedad (%)',
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Precipitacion (mm)',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  })

  const scrollAreaRef = useRef(null)
  const lastMessageRef = useRef(null)

  const extractWeatherData = (response) => {
    // Expresión regular mejorada para la temperatura, que captura valores negativos y permite espacios opcionales
    const tempMatch = response.match(/(-?\d+(\.\d+)?)\s?°\s?C/);
    const humidityMatch = response.match(/(\d+(\.\d+)?)\s?%/);  // Ajuste para permitir valores decimales de humedad
    const precipitationMatch = response.match(/(\d+(\.\d+)?)\s?mm/);  // Ajuste similar para precipitaciones
  
    // Validación para la temperatura, asegurando que sea un número
    const temperature = tempMatch && !isNaN(tempMatch[1]) ? parseFloat(tempMatch[1]) : null;
    
    // Validación para la humedad
    const humidity = humidityMatch && !isNaN(humidityMatch[1]) ? parseInt(humidityMatch[1], 10) : null;
  
    // Validación para la precipitación
    const precipitation = precipitationMatch && !isNaN(precipitationMatch[1]) ? parseFloat(precipitationMatch[1]) : null;
  
    return { temperature, humidity, precipitation };
  }
  
  
  

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages'))
    if (storedMessages) {
      setMessages(storedMessages)
    }
  }, [])

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages))
    }
  }, [messages])

  const loadResponse = async (query) => {
    setLoading(true)
    console.log('Enviando consulta al servidor: ', query)
    try {
      const res = await fetch('http://localhost:3000/api/model/consulta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulta: query }),
      })
  
      if (!res.body) throw new Error('No se pudo leer la respuesta del servidor')
  
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let botMessage = ''
  
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
  
        const text = decoder.decode(value, { stream: true })
        botMessage += text
  
        setMessages((prev) => {
          const updatedMessages = [...prev]
          const streamingMessage = updatedMessages.find(
            (msg) => msg.type === 'bot' && msg.isStreaming
          )
          if (streamingMessage) {
            streamingMessage.content = botMessage
          } else {
            updatedMessages.push({ type: 'bot', content: text, isStreaming: true })
          }
          return updatedMessages
        })
      }
  
      setMessages((prev) =>
        prev.map((msg) =>
          msg.type === 'bot' && msg.isStreaming ? { ...msg, isStreaming: false } : msg
        )
      )

      const weatherInfo = extractWeatherData(botMessage)
      setWeatherData(weatherInfo)

      setChartData((prevData) => {
        const newLabels = [...prevData.labels, new Date().toLocaleTimeString()]
        const newTemperatureData = [...prevData.datasets[0].data, weatherInfo.temperature]
        const newHumidityData = [...prevData.datasets[1].data, weatherInfo.humidity]
        const newPrecipitationData = [...prevData.datasets[2].data, weatherInfo.precipitation]

        return {
          labels: newLabels,
          datasets: [
            { ...prevData.datasets[0], data: newTemperatureData },
            { ...prevData.datasets[1], data: newHumidityData },
            { ...prevData.datasets[2], data: newPrecipitationData },
          ],
        }
      })

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: 'Error al recuperar la respuesta del servidor.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSend = () => {
    if (query.trim()) {
      setMessages((prev) => [...prev, { type: 'user', content: query }])
      loadResponse(query)
      setQuery('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem('chatMessages')
  }

  const downloadChat = () => {
    const chatContent = messages.map((msg) => `${msg.type}: ${msg.content}`).join('\n\n')
    const blob = new Blob([chatContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'chat_history.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const ChatMessage = ({ message }) => {
    const isUser = message.type === 'user';
  
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex items-center max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-500 ml-0' : 'bg-gray-300 mr-2'} 
            ${isUser ? 'mt-0.5' : ''} // Ajuste fino de la altura
          `}>
            {isUser ? 'U' : 'IA'}
          </div>
          <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      </div>
    );
  };
  
  
  
  

  const WeatherIcon = ({ condition }) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-500" />
      case 'windy':
        return <Wind className="w-6 h-6 text-green-500" />
      default:
        return <Cloud className="w-6 h-6 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaRobot className="w-8 h-8 text-yellow-500" />
            <h1 className="text-2xl font-semibold">CIFOR IA</h1>
          </div>
          <div className="space-x-2 flex items-center">
            <button onClick={clearChat} className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
              <Trash className="h-4 w-4" />
            </button>
            <button onClick={downloadChat} className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
              <Download className="h-4 w-4" />
            </button>
            <Link
              to="/multiVariablechart"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Graficos anteriores
            </Link>

            <Link
              to="/weatherpromedio"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Ver promedios
            </Link>

          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 space-y-4 overflow-hidden">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div
            ref={scrollAreaRef}
            className="h-[calc(100vh-300px)] overflow-y-auto p-4"
          >
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {loading && (
              <div className="flex justify-center">
                <Loader className="w-6 h-6 animate-spin text-gray-500" />
              </div>
            )}
            <div ref={lastMessageRef} />
          </div>
        </div>
        <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Escribe tu consulta..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded"  // Cambio a w-full para que ocupe todo el espacio disponible
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          <ArrowUpCircle className="h-4 w-4 text-black" /> {/* Flecha de color negro */}
        </button>
</div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-semibold flex items-center justify-between cursor-pointer" onClick={() => setShowWeatherData(!showWeatherData)}>
              Últimos datos meteorológicos
              <ArrowUpCircle className={`h-4 w-4 transition-transform ${showWeatherData ? 'rotate-180' : ''}`} />
            </h2>
          </div>
          {showWeatherData && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
                  <h3 className="font-semibold">Temperatura: {weatherData.temperature} °C</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
                  <h3 className="font-semibold">Humedad: {weatherData.humidity} %</h3>
                </div>
                <div className="bg-purple-100 dark:bg-purple-800 p-4 rounded-lg">
                  <h3 className="font-semibold">Precipitación: {weatherData.precipitation} mm</h3>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4">
            <h2 className="text-xl font-semibold flex items-center justify-between cursor-pointer" onClick={() => setShowChart(!showChart)}>
              Gráfico de Tiempo
              <ArrowUpCircle className={`h-4 w-4 transition-transform ${showChart ? 'rotate-180' : ''}`} />
            </h2>
          </div>
          {showChart && (
            <div className="p-4">
              <div className="h-[300px]">
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default FormoWeatherAIModerno


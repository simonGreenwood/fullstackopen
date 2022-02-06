import axios from "axios"
import {useEffect,useState} from "react"
const Weather = ({country}) => {
  const [temp,setTemp] = useState()
  const [windSpeed,setWindSpeed] = useState()
  const [windDirection, setWindDirection] = useState()
  const [weatherIcon, setWeatherIcon] = useState()
  const hook = () => {
    const apiKey = process.env.REACT_APP_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital[0]}`
    
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        setTemp(response.data.current.temperature)
        setWeatherIcon(response.data.current.weather_icons[0])
        setWindSpeed(response.data.current.wind_speed)
        setWindDirection(response.data.current.wind_dir)
      }
    )
  }
  useEffect(hook,[])
  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p><strong>Temperature:</strong> {temp}°C</p>
      <img src={weatherIcon}/>
      <h3>Wind</h3>
      <p><strong>Speed:</strong> {windSpeed}mph</p>
      <p><strong>Direction:</strong> {windDirection}</p>
    </div>
  )
}
export default Weather
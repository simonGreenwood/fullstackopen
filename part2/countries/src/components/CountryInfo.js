
import axios from "axios"
import Weather from "./Weather"
const CountryInfo = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Population: {country.population}</p>
      <h2>Languages Spoken:</h2>
      <ul>
        {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
      </ul>
      <img src={country.flags.png}/> 
      <Weather country={country}/>
    </div>
  )
}
export default CountryInfo
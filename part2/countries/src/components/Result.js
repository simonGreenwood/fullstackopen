import Country from "./Country"
import CountryInfo from "./CountryInfo"
import {useState} from "react"
const Result = ({countries}) => {
  const [showSearchResults, setShowSearchResults] = useState(true)
  const [infoCountry,setInfoCountry] = useState()
  const handleShownButton = (country) => {
      setShowSearchResults(false)
      setInfoCountry(country)
  }
  if (!showSearchResults) {
    console.log("Not showing search results as the show button was pressed")
    return <CountryInfo country={infoCountry}/>
  } else if (countries.length==1) {
    return (
      <div>
        <CountryInfo country={countries[0]} />
      </div>
    )
  } else if (countries.length>10) {
    return (
      <div>
        <p>Too many matches - try another filter!</p>
      </div>
    )
  } else {
      return (
        <div>
          {countries.map(country=><Country key={country.cca2} country={country} onShowClicked={(country) => handleShownButton(country)}/>)}
        </div>
      )
    }
}
export default Result
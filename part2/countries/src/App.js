import React,{ useState, useEffect} from 'react'
import axios from 'axios'
import Result from './components/Result'

const App = () => {
  const [countries,setCountries] = useState([])
  const [filter,setFilter] = useState("")
  const hook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response =>  {
        setCountries(response.data)
      }
    )

  }
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  useEffect(hook,[])
  return (
    <div className="App">
      <form> 
        filter countries <input id="filter" type="text" onChange={(event) => {setFilter(event.target.value)}}/>
      </form>
      <Result countries={filteredCountries}/>
    </div>
  );
}

export default App;

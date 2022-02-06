const Country = ({country,onShowClicked}) => {
  return (
    <div>
      {country.name.common} <button onClick={() => onShowClicked(country)}>Show Info</button>
    </div>
  )
}
export default Country
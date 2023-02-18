import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const api_key = process.env.REACT_APP_API_KEY
  const [data, setData] = useState([])
  const [country, setCountry] = useState('')
  const [ weather, setWeather] = useState([])

  const filterItems = (array, term) => {
    return array.filter(el => el.name.toLowerCase().startsWith(term.toLowerCase()) === true)
  }

  const countriesToShow = filterItems(data, country)

  console.log(countriesToShow)

  console.log(country)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setData(response.data)
        console.log(data)
      })
  }, [])

  const Result = ({countriesToShow}) => {
    
    if(countriesToShow.length > 10) return <p>Too many matches, specify another filter</p>; 

    else if (countriesToShow.length <= 10 && countriesToShow.length >= 2) {
      return (
        countriesToShow.map(country => {return <li key={country.callingCodes}>{country.name} <button value={country.name} onClick={setThisCountry}>show</button></li>})
      )
    }

    else if (countriesToShow.length === 1) { 
      const c = countriesToShow[0];

      if (weather!==undefined){
        return (
        <div>
          <h1>{c.name}</h1>
          <br />
          <p>capital {c.capital}</p>
          <p>area {c.area}</p>
          <br />
          <h3>languages: </h3>
          <ul>
          {c.languages.map(lang => {return <li key={lang.id}>{lang.name}</li>})}
          </ul>
          <img src={c.flags.png}/>
          <h3>Weather in {countriesToShow[0].capital}</h3>
            <p><b>temperature: </b>{weather.temperature} Celsius</p>
            <p><img alt="descriptor" src={weather.weather_icons} /></p>
            <p><b>wind: </b>{weather.wind_speed} kph direction {weather.wind_dir}</p>
        </div>
        )
      }

      else{
        return(
          <div>
            <h1>{c.name}</h1>
            <br />
            <p>capital {c.capital}</p>
            <p>area {c.area}</p>
            <br />
            <h3>languages: </h3>
            <ul>
            {c.languages.map(lang => {return <li key={lang.id}>{lang.name}</li>})}
            </ul>
            <img src={c.flags.png}/>
            <p>Weather API usage has exceeded access for the host of this server.</p>
          </div>
        )
      }

    }

    else return null; 
  }

  

  const setThisCountry = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
    document.getElementById('country').value = e.target.value;
  }

  if (countriesToShow.length===1){
    setInterval(axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countriesToShow[0].latlng[0]}&lon=${countriesToShow[0].latlng[1]}&appid=${api_key}`)
    .then(response => {
      setWeather(response.data.current)
    }), 10000000)
  }

  return (
    <div className="App">
      <h1>search for a country</h1>
      <input id="country" onChange={(e) => setCountry(e.target.value)}/>
      <Result countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;

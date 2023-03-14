import { useEffect, useState } from 'react'
import axios from 'axios'
import { CountryDetail } from './components/CountryDetail'

const URL = 'https://restcountries.com/v3.1/all'
const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [shownCountry, setShownCountry] = useState(null)
  const [countryWeather, setCountryWeather] = useState(null)

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  useEffect(() => {
    axios.get(URL).then((res) => setCountries(res.data))
  }, [])

  useEffect(() => {
    const filteredCountry = filteredCountries[0]

    if (filteredCountries.length === 1 && !shownCountry) {
      setShownCountry(filteredCountry)
      getCountryWeather(filteredCountry.latlng[0], filteredCountry.latlng[1])
    } else if (filteredCountries.length === 1 && shownCountry) {
      setShownCountry(filteredCountry)
    }
  }, [filteredCountries, shownCountry])

  useEffect(() => {
    if (shownCountry) {
      getCountryWeather(shownCountry.latlng[0], shownCountry.latlng[1])
    }
  }, [shownCountry])

  const getCountryWeather = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      .then((res) => setCountryWeather(res.data))
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSetShown = (country) => {
    if (!shownCountry) {
      getCountryWeather(country.latlng[0], country.latlng[1])
      setShownCountry(country)
      return
    }

    if (shownCountry.name.common === country.name.common) {
      setShownCountry(null)
      return
    }

    setShownCountry(country)
    getCountryWeather(country.latlng[0], country.latlng[1])
  }

  return (
    <div>
      find countries <input onChange={handleChange} value={filter} />
      <div>
        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {filteredCountries.length < 11 &&
          filteredCountries.length > 1 &&
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              <span>{country.name.common}</span>
              <button onClick={() => handleSetShown(country)}>
                {shownCountry?.name.common === country.name.common
                  ? 'Hide'
                  : 'Show'}
              </button>
            </div>
          ))}

        {shownCountry && (
          <CountryDetail
            key={shownCountry.name.common}
            country={shownCountry}
          />
        )}
      </div>
      {shownCountry && countryWeather && (
        <div>
          <h2>Weather in {shownCountry.name.common}</h2>
          <p>temperature {countryWeather.main.temp} Celcius</p>
          <img
            src={`http://openweathermap.org/img/wn/${countryWeather.weather[0].icon}.png`}
            width={100}
            alt="weather icon"
          />
          <p>wind {countryWeather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App

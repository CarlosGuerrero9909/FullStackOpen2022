import React, { useState, useEffect } from 'react'
import { getWeatherCountry } from '../services/countries/getWeatherCountry'

const Country = ({ name, capital, population, languages, flag }) => {
  const [showCountry, setShowCountry] = useState(false) 
  
  const handleSubmit = event => {
    event.preventDefault()
    setShowCountry(!showCountry)
  }

  const renderCountry = () => {
    return(
      <InfoCountry 
        name={name} 
        capital={capital}
        population={population}
        languages={languages}
        flag={flag}
      />
    )
  }

  return (
  <div>
    <li>{name}</li>
    <form onSubmit={handleSubmit}>
      <button type='submit'>{showCountry ? 'Hide' : 'Show'}</button>
      {showCountry ? renderCountry() : ''}
    </form>
  </div>
  )
}
  
const InfoCountry = ({ name, capital, population, languages, flag }) => {
  const [weather, setWeather] = useState({})
  const arrayLanguages = Object.values(languages) 

  useEffect(() => {
    getWeatherCountry(capital[0]).then(weather => {
      setWeather(weather)
    })
  }, [])

  if(typeof weather.current !== 'undefined')
    return (
      <div>
        <h2>{name}</h2>
        <p>Capital: {capital}</p>
        <p>Population: {population}</p>

        <h2>Languages</h2>
        <ul>
          {arrayLanguages.map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>

        <h2>Flag</h2>
        <p style={{fontSize: 100, margin: 0}}>{flag}</p>

        <h2>Wheather in {capital}</h2>
        <p>Temperature: {weather.current.temperature}° Celsius</p>
        <img src={weather.current.weather_icons} alt="" />
        <p>Wind: {weather.current.wind_speed}mph, direction {weather.current.wind_dir}</p>
      </div>
    )
}

const Countries = ({ _countriesToShow = [] }) => {
  if (_countriesToShow.length === 1 ){
    const uniqueCountry = _countriesToShow[0]
    return (
      <InfoCountry 
        name={uniqueCountry.name.common} 
        capital={uniqueCountry.capital}
        population={uniqueCountry.population}
        languages={uniqueCountry.languages}
        flag={uniqueCountry.flag}
      />
    )
  }

  else if (_countriesToShow.length === 0)
    return (
      <p>Too many matches, specify another filter</p>
    )

  return (
  <ul>
    {_countriesToShow.map(country => 
      <Country key={country.name.common} 
        name={country.name.common} 
        capital={country.capital}
        population={country.population}
        languages={country.languages}
        flag={country.flag}  
      />
    )}
  </ul>
  )
}

export default Countries

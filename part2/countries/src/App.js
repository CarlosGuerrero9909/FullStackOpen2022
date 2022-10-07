import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import { Filter } from './components/Filter'
import { getAllCountries } from './services/countries/getAllCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  useEffect(() => {
    getAllCountries().then(countries => {
      setCountries(countries)
    })
  }, [])

  const handleFilterCountry = event => setFilterCountry(event.target.value)  

  const countriesToShow = () => {
    const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry))
    
    if (filterCountries.length > 10)
      return undefined 

    return filterCountries
  }

  return (
    <div>
      <Filter _filterCountry={filterCountry} _handleFilterCountry={handleFilterCountry}/>
      <Countries _countriesToShow={countriesToShow()} />
    </div>
  )
}

export default App

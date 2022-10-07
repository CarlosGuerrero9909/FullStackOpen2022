import axios from 'axios'

export const getWeatherCountry = (capital) => {
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: capital,
  }

  return (
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        return response.data
      }).catch(error => {
        console.log(error)
      })
  )
}


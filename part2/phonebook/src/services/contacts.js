import axios from 'axios'

const baseURL = 'http://localhost:3001/contacts'

const getAll = () => {
  return (
    axios
      .get(baseURL)
      .then(response => {
        return response.data
      })
  ) 
}

const create = (_newContact) => {
  return (
    axios
      .post(baseURL, _newContact)
      .then(response => {
        return response.data
      })
  )
}

const update = (id, newObject) => {
  return (
    axios
      .put(`${baseURL}/${id}`, newObject)
      .then(response => {
        return response.data
      })
  )
}

const erase = id => {
  return (
    axios
      .delete(`${baseURL}/${id}`)
      .then(response => {
        return response
      })
  )
}

export default {getAll, create, erase, update} 

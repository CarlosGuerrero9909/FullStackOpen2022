import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

//El módulo noteService contiene una variable privada token. Su valor se puede cambiar con una función setToken, que es exportada por el módulo.
const setToken = newToken => {  
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  //establece el token en el header Authorization
  const config = {    
    headers: { Authorization: token },  
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update,
  setToken
}
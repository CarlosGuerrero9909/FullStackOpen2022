import axios from 'axios'

const baseUrl = '/api/notes'

//Mejor manera
const getAll = () => {
  return (
    axios.get(baseUrl).then(response => {    
      return response.data  
    })
  )
}

const create = newObject => {
  return (
    axios.post(baseUrl, newObject).then(response => {    
      return response.data  
    })
  )
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


//Dado que los nombres de las claves y las variables asignadas son los mismos, podemos escribir la definición del objeto con una sintaxis más compacta:
export default { getAll, create, update }

import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObj => {
  const request = axios.post(baseUrl, newObj)
  return request.then(response => response.data)
}

const update = (id, changedObj) => {
  const request = axios.put(`${baseUrl}/${id}`, changedObj)
  return request.then(response => response.data)
}


export default { 
  getAll, 
  create, 
  update
}
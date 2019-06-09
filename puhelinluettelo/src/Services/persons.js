import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const update = (nameObject) => {
    const request = axios.put(`${baseUrl}/${nameObject.id}`, nameObject)
    return request.then(response => response.data)
}

const create = nameObject => {
    return axios.post(baseUrl, nameObject)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}    

export default { getAll, create, remove, update }
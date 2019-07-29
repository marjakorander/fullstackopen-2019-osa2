import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const promise = axios.get(baseUrl)

    return promise.then(response => response.data)
}

const create = (nameObject) => {
    const promise = axios.post(baseUrl, nameObject)

    return promise.then(response => response.data)
}

const remove = (id) => {
    const promise = axios.delete(`${baseUrl}/${id}`)

    return promise.then(response => response.data)
}  

const update = (nameObject) => {
    const promise = axios.put(`${baseUrl}/${nameObject.id}`, nameObject)
    
    return promise.then(response => response.data)
}  

export default { getAll, create, remove, update }
import axios from "axios";
const baseUrl = 'http://localhost:3003/persons'

const get = () => {
    const promise = axios.get(baseUrl)
    return promise.then(result => result.data)
}

const create = (newObj) => {
    const promise = axios.post(baseUrl, newObj)
    return promise.then(result => result.data)  //for POST, the result only contains what u input, not all the persons
}

const drop = (id) => {
    const promise = axios.delete(`${baseUrl}/${id}`)
    return promise.then(() => {
        console.log('Delete successful.')
    })
    .catch((error) => {
        console.log(error.status,'delete failed')
        throw error
    }
    )
}

const update = (id, obj) => {
    const promise = axios.put(`${baseUrl}/${id}`,obj)
    return promise.then(result => result.data)
}

export default {
    get: get,
    create: create,
    drop: drop,
    update: update
}
import axios from 'axios'
const baseurl = 'http://localhost:3001/persons'

const create = noteObj => {
    const request = axios.post(baseurl,noteObj)
    return request.then(response => response.data)
}

const getAll = () =>{
    const request = axios.get(baseurl)
    return request.then(response => response.data)
}

const deletePerson = (id) =>{
    const url = `${baseurl}/${id}`
    const request = axios.delete(url)
    return request.then(res => res.data)
}

const updateNum = (per,newNum) =>{
    const url = `${baseurl}/${per.id}`
    const updatedPerson = {
        ...per,
        phno : newNum
    }
    const req = axios.put(url,updatedPerson)
    return req.then(res => res)
}

export default {create,getAll,deletePerson,updateNum}
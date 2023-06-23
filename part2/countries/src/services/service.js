import axios from "axios";

const getWeather=(city,key)=>{
    let url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
    const request = axios.get(url)
    return request.then(res => res.data)
}

const getAll=()=>{
    let url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    const req = axios.get(url)
        .catch(err => console.log(err))
    return req.then(res=>res.data)
}

export default {getAll,getWeather}
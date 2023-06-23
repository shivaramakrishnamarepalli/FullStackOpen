import React from "react";
import service from "../services/service";

export default function SearchResult({result}){
    const [show,setShow] = React.useState(false)
    const [showCountry,setShowCountry] = React.useState()

    let l = result.length
    //console.log(result.map(country=>country.name.common))

    const showDetails =(country)=>{
        if(showCountry)
        if(country.name.official === showCountry.name.official){
            setShow(!show)
            return
        }
        setShow(true)
        setShowCountry(country)
    }

    return (
        <>
            {l>10 && <p>Too many matches, specify another filter</p>}
            {l===0 && <p>No results found</p>}
            {l===1 && <div><Country co={result[0]}/> <Weather  co={result[0]}/></div>}
            {l>1 && l<=10 && 
                result.map(country => <li key={country.name.official}>{country.name.common}
                    <button onClick={()=>showDetails(country)}>show</button>
                </li>)
            }
            {l!==1 && show && <Country co={showCountry} />}
        </>
    )
}

export function Country({co}){
    const langAccepted = Object.values(co.languages)
    return (
        <div>
            <h1>{co.name.common}</h1>
            <b>capital {co.capital}
            <br></br>
            area {co.area}</b>

            <h4>languages : </h4>
            <ul>{langAccepted.map(lang => <li key={lang}>{lang}</li>)}</ul>
            <img src={co.flags.png} alt='flag'></img>
        </div>
    )
}

export function Weather({co}){
    const key= process.env.REACT_APP_WEATHER_API_KEY
    const city = co.capital
    const [temp,setTemp] = React.useState(null)
    const [img,setImg] = React.useState(null)
    const [wind,setWind] = React.useState(null)
    React.useEffect(()=>{
        service.getWeather(city,key)
            .then(res=>{
                setTemp(res.current.temp_c)
                setImg(res.current.condition.icon)
                setWind((0.44704*res.current.wind_mph).toFixed(2))
            })
    },[])
    
    return (
        <div>
            <h2>Weather in {co.capital}</h2>
            <h4>temperature {temp} celsius</h4>
            <img src={img} alt="weather condition"></img>
            <h4>wind {wind}m/s</h4>
        </div>
    )
}
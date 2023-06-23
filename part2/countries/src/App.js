import React, { useEffect } from "react"
import service from "./services/service"
import SearchResult from "./components/SearchResult"

export default function App(){

  const [search,setSearch] = React.useState([''])
  const [result,setResult] = React.useState([])

  useEffect(()=>{
    service.getAll()
      .then(response => {
        setResult(response)
    })
  },[])

  const handleSearch = (event) =>{
    const val = event.target.value
    setSearch(val)
  }
  
  const handleSubmit = (event) =>{
    event.preventDefault()
  }

  const sendResult = () => {
    const data = result.filter(co => co.name.common.toLowerCase().includes(search))
    return data
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        find countries <input value={search} onChange={handleSearch}/>
      </form>
      <SearchResult result={sendResult()} search={search}/>
    </div>
  )
}
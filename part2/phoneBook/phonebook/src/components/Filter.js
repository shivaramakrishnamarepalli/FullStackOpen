export default function Filter({setFilter}){
    const handleFilter = (event) =>{
      setFilter(event.target.value)
    }
  
    return (
      <>
        filter shown with <input onChange={handleFilter}/>
      </>
    )
}
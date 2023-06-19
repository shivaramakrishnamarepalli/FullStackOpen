import { useState } from 'react'
import Show from "./components/Show"
import AddNote from "./components/AddNote"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phno : '39-44-5323532'
    }
  ]) 
  const [filter,setFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter}/>
      <AddNote persons={persons} setPersons={setPersons}/>
      <Show persons={persons} value={filter}/>
    </div>
  )
}

export default App
import { useState,useEffect } from 'react'
import Show from "./components/Show"
import AddNote from "./components/AddNote"
import Filter from "./components/Filter"
import personService from "./services/persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(()=>{
    personService.getAll()
      .then(list => setPersons(list))
  },[])

  const [filter,setFilter] = useState('')
  const [notification,setNotification]=useState(null)

  const deleteContact = (id) => {
    const per = persons.find(person => person.id === id)
    const confirm = window.confirm(`Are you sure you want to delete ${per.name}?`);
    if (confirm) {
      personService
        .deletePerson(id)
        .then(() => personService.getAll())
        .then((updatedPersons) => {
          setPersons(updatedPersons);
        })
        .catch((error) => {
          console.error("Error deleting contact:", error);
          setNotification(`${per.name} is already removed from the server`)
          setTimeout(()=>{setNotification(null)},5000)
        });
        setNotification(`Deleted ${per.name}`)
        setTimeout(()=>{setNotification(null)},5000)
    }
  };
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter setFilter={setFilter}/>
      <AddNote persons={persons} setPersons={setPersons} personService={personService} setNotification={setNotification}/>
      <Show persons={persons} value={filter} deleteContact={deleteContact}/>
    </div>
  )
}

export default App
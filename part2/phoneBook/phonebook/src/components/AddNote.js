import React from "react"

export default function AddNote({persons,setPersons}){

    const [newPerson, setNewPerson] = React.useState({name : '',phno : ''})
  
    const handleSubmit = (event) =>{
      event.preventDefault()
      if(newPerson.name==="" || newPerson.phno===""){
        alert("Null values are not accepted")
      }
      else if(persons.find(person => person.name === newPerson.name))
        alert(`${newPerson.name} is already used`)
      else if(persons.find(person => person.phno === newPerson.phno))
        alert(`${newPerson.phno} is already used`)
      else{
        setPersons(persons.concat(newPerson))
      }
      //setNewPerson({name : '',phno : ''})
    }
  
    const handleNameChange = (event) => {
      setNewPerson({
        ...newPerson,
        name : event.target.value
      })
    }
  
    const handlePhnoChange = (event) => {
      setNewPerson({
        ...newPerson,
        phno : event.target.value
      })
    }
  
    return (
      <>
        <h2>Add a new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input onChange={handleNameChange}/>
          </div>
          <div>
            Phno: <input onChange={handlePhnoChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }
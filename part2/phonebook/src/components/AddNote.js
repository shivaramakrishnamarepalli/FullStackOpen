import React from "react"

export default function AddNote({persons,setPersons,personService,setNotification}){

    const [newPerson, setNewPerson] = React.useState({name : '',number : ''})
    let confirm = false
    let per
  
    const handleSubmit = (event) => {
      event.preventDefault();
    
      if (newPerson.name === "" || newPerson.number === "") {
        alert("Null values are not accepted");
        return;
      }
    
      if ((per = persons.find((person) => person.name === newPerson.name))) {
        confirm = window.confirm(
          `${newPerson.name} is already used. Do you want to update the phone number?`
        );
    
        if (confirm) {
          personService
            .updateNum(per, newPerson.number)
            .then(() => personService.getAll())
            .then((updatedPersons) => {
              setPersons(updatedPersons);
              setNewPerson({ name: "", number: "" });
            })
            .catch((error) => {
              console.error("Error updating person:", error);
            });
        }
      } else if (persons.find((person) => person.number === newPerson.number)) {
        alert(`${newPerson.number} is already used`);
      } else {
        personService
          .create(newPerson)
          .then((createdPerson) => {
            Promise.all([personService.getAll(), setPersons(persons.concat(createdPerson))])
              .then(([updatedPersons]) => {
                setPersons(updatedPersons);
                setNotification(`Added ${newPerson.name}`)
                setNewPerson({ name: "", number: "" });
                setTimeout(()=>{
                  setNotification(null)
                },5000)
              })
              .catch((error) => {
                console.error("Error updating persons:", error);
              });
          })
          .catch((error) => {
            console.error("Error creating person:", error);
          });
      }
    };    
    
    const handleNameChange = (event) => {
      setNewPerson({
        ...newPerson,
        name : event.target.value
      })
    }
  
    const handlenumberChange = (event) => {
      setNewPerson({
        ...newPerson,
        number : event.target.value
      })
    }
  
    return (
      <>
        <h2>Add a new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input value={newPerson.name} onChange={handleNameChange}/>
          </div>
          <div>
            number: <input value={newPerson.number} onChange={handlenumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }
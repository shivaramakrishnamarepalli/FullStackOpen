import React from "react"

export default function AddNote({persons,setPersons,personService,setNotification}){

    const [newPerson, setNewPerson] = React.useState({name : '',phno : ''})
    let confirm = false
    let per
  
    const handleSubmit = (event) => {
      event.preventDefault();
    
      if (newPerson.name === "" || newPerson.phno === "") {
        alert("Null values are not accepted");
        return;
      }
    
      if ((per = persons.find((person) => person.name === newPerson.name))) {
        confirm = window.confirm(
          `${newPerson.name} is already used. Do you want to update the phone number?`
        );
    
        if (confirm) {
          personService
            .updateNum(per, newPerson.phno)
            .then(() => personService.getAll())
            .then((updatedPersons) => {
              setPersons(updatedPersons);
              setNewPerson({ name: "", phno: "" });
            })
            .catch((error) => {
              console.error("Error updating person:", error);
            });
        }
      } else if (persons.find((person) => person.phno === newPerson.phno)) {
        alert(`${newPerson.phno} is already used`);
      } else {
        personService
          .create(newPerson)
          .then((createdPerson) => {
            Promise.all([personService.getAll(), setPersons(persons.concat(createdPerson))])
              .then(([updatedPersons]) => {
                setPersons(updatedPersons);
                setNotification(`Added ${newPerson.name}`)
                setNewPerson({ name: "", phno: "" });
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
            name: <input value={newPerson.name} onChange={handleNameChange}/>
          </div>
          <div>
            Phno: <input value={newPerson.phno} onChange={handlePhnoChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }
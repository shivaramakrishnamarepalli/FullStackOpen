import { useState } from 'react';

const AddAcc =({persons,setPersons})=>{

    const [newName, setNewName] = useState('');
    const [newNum, setNewNum] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (!newName || !newNum) {
        alert('Please enter a name and number');
        return;
      }
  
      if (persons.some((person) => person.name === newName)) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
  
      const noteObj = {
        name: newName,
        number: newNum,
      };
      setPersons(persons.concat(noteObj));
      setNewName('');
      setNewNum('');
    };
  
    const handleName = (event) => {
      setNewName(event.target.value);
    };
    const handleNum = (event) => {
      setNewNum(event.target.value);
    };
  
    return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleName} />
      </div>
      <div>number: <input value={newNum} onChange={handleNum} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>)
}

export default AddAcc;
  
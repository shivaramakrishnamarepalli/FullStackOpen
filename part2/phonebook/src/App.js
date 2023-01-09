import { useState ,useEffect} from 'react';
import Filter from './components/Filter';
import AddAcc from './components/AddAcc';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(()=>{
    console.log("effect")
    axios
    .get("http://localhost:3001/persons")
    .then(response => {
      console.log("promise fulfilled")
      setPersons(response.data)
    })
  },[])

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const handleFilter = (event) => {
    const search = event.target.value;
    const newFilter = persons.filter((person) => {
      if (person.name && person.number) {
        return person.name.toLowerCase().startsWith(search.toLowerCase()) ||
               person.number.startsWith(search);
      }
    });
    setFilter(newFilter);
    setSearch(search);
  };
  
    
  return (
    
    <div>
      <h2>Phonebook</h2>
      <form>
        Search: <input value={search} onChange={handleFilter} />
      </form>
      <h2>add a new</h2>
      <AddAcc persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Filter filter={filter} persons={persons} />
    </div>
  );
};


export default App;
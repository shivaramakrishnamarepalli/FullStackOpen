import { useState } from 'react';
import Filter from './components/Filter';
import AddAcc from './components/AddAcc';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  
  const handleFilter = (event) => {
    const search = event.target.value;
    const newFilter = persons.filter((person) =>
    person.name.toLowerCase().startsWith(search.toLowerCase()) ||
    person.number.startsWith(search)
    );
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
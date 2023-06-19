export default function Show({persons,value}){
  if (value) {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter(person => person.name.toLowerCase().startsWith(value.toLowerCase()) 
        || person.phno.toLowerCase().startsWith(value.toLowerCase()))
        .map(person => (
          <li key={person.name}>
            {person.name} {person.phno}
          </li>
        ))}
    </>
    );
  }
  else {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map(person => (
        <li key={person.name}>
          {person.name} {person.phno}
        </li>
      ))}
    </>
  );
  }
}

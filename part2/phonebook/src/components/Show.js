export default function Show({ persons, value,deleteContact}) {
  return (
    <>
      <h2>Numbers</h2>
      {value !== '' ? 
      (Array.isArray(persons) &&
        persons
          .filter((person) => {
            const name = person.name && person.name.toLowerCase();
            const number = person.number && person.number.toLowerCase();
            return (
              name && name.startsWith(value.toLowerCase()) ||
              number && number.startsWith(value.toLowerCase())
            );
          })
          .map((person) => (
            <li key={person.name+person.id}>
              {person.name} {person.number} <button onClick={()=>deleteContact(person.id)}>delete</button>
            </li>
          ))
      ) : (
        Array.isArray(persons) &&
        persons.map((person) => (
          <li key={person.name+person.id}>
            {console.log(person)}
            {person.name} {person.number} <button onClick={()=>deleteContact(person.id)}>delete</button>
          </li>
        ))
      )}
    </>
  );
}

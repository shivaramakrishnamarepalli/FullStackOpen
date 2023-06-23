export default function Show({ persons, value,deleteContact}) {
  return (
    <>
      <h2>Numbers</h2>
      {value !== undefined ? 
      (Array.isArray(persons) &&
        persons
          .filter((person) => {
            const name = person.name && person.name.toLowerCase();
            const phno = person.phno && person.phno.toLowerCase();
            return (
              name && name.startsWith(value.toLowerCase()) ||
              phno && phno.startsWith(value.toLowerCase())
            );
          })
          .map((person) => (
            <li key={person.name}>
              {person.name} {person.phno} <button onClick={()=>deleteContact(person.id)}>delete</button>
            </li>
          ))
      ) : (
        Array.isArray(persons) &&
        persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.phno} <button onClick={()=>deleteContact(person.id)}>delete</button>
          </li>
        ))
      )}
    </>
  );
}

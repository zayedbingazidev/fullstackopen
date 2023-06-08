const Person = ({ person, handleDelete}) => {
  return <>
      <div key={person.id}>{person.name} {person.number} &nbsp; <button key={person.id} onClick={()=> {handleDelete(person.id)}}>Delete</button></div>
  </>
}

export default Person

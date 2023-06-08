import Person from "./Person"

const PhoneBookList = ({personList, handleDeletePerson}) => {

      return <>
                  {personList.map((person) => {
                        return <Person key={person.id} person={person} handleDelete={handleDeletePerson}/>
                  })}
          </>
}

export default PhoneBookList
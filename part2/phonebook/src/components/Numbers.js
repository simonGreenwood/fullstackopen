import Contact from "./Contact"
const Numbers = ({persons, activeFilter, onDelete}) => {
  console.log(persons)
  return(
    <div>
      {persons
        .filter(person => person.name.toLowerCase().startsWith(activeFilter.toLowerCase()))
        .map(person=><Contact person={person} key={person._id} onDelete={(p) => onDelete(p)}/>)}
    </div>
  )
}
export default Numbers  
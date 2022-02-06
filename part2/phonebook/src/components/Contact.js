const Contact = ({person,onDelete}) => {
    return <p>{person.name} {person.number} <button onClick={() => onDelete(person)}>Delete</button></p>
}
export default Contact
const AddContact = (props) => {
  return(
    <form>
      <div>
        name: <input value={props.newName} onChange={props.onNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.onNumberChange}/>
      </div>
      <div>
        <button type="submit" onClick={props.handleSubmit}>Add</button>
      </div>
    </form>
  )
}
export default AddContact
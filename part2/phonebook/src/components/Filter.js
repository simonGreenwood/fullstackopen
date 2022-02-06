const Filter = (props) => {
  return(
    <form>
      Filter by Name: <input value={props.value} onChange={props.onChange} />
    </form>
  )
}
export default Filter
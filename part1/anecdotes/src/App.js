import {useState, React} from 'react';
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [points, setPoints] = useState([0,0,0,0,0,0,0])
  const [selected, setSelected] = useState(0)
  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 6)
    setSelected(number)
    console.log()
  }
  const onVoteButtonClick = () => {
    console.log(selected)
    const copy = [...points]
    copy[selected]++;
    setPoints(copy)
    console.log(anecdotes[points.indexOf(Math.max(...points))])
  }
  return (
    <div>
      <h1>Anecdote</h1>
      <p>{anecdotes[selected]}</p>
      <p>{points[selected]}</p>
      <button onClick={() => generateRandomNumber()}>Generate Anecdote</button>
      <button onClick={() => onVoteButtonClick()}>vote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  )
}

export default App;
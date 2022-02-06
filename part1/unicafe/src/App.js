
import React, { useState } from 'react'
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  return (
    <div>
      <table>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={props.good+props.neutral+props.bad}/>
        <StatisticLine text="average" value={(props.good - props.bad) / (props.good + props.neutral + props.bad)}/>
        <StatisticLine text="positive" value={(props.good/(props.good+props.neutral+props.bad)*100)+"%"}/>
      </table>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const onGoodClicked = () => {
    setGood(good+1)
  }
  const onNeutralClicked = () => {
    setNeutral(neutral+1)
  }
  const onBadClicked = () => {
    setBad(bad+1)
  }
  if (good | neutral | bad ) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <button onClick={onGoodClicked}>good</button> 
        <button onClick={onNeutralClicked}>neutral</button>
        <button onClick={onBadClicked}>bad</button>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Give Feedback</h1>
        <button onClick={onGoodClicked}>good</button>
        <button onClick={onNeutralClicked}>neutral</button>
        <button onClick={onBadClicked}>bad</button>
        <h1>Statistics</h1>
        <p>No stats yet</p>
        
      </div>
    )
  }
}
export default App
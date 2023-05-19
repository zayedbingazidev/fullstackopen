import { useState } from 'react'
import './App.css'

const Button = ({name, handleClick}) => (
    <button onClick={handleClick}>
      {name}
    </button>
  )

const StatisticsLine = ({name, value})  => (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  )

const AllOutComes = ({total, avg, positive}) => {
  if (total>0) return (
   <table>
    <tbody>
      <tr>
        <td>All</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>Average</td>
        <td>{avg}</td>
      </tr>
      <tr>
        <td>Positive</td>
        <td>{positive}%</td>
      </tr>
    </tbody>
    
   </table>
  )

  return (<p>No Feedback Given</p>)
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const avg = total/3;
  const positive = (good/total)*100;

  const handleClick =(buttonState, setButtonState) => {
    return () => setButtonState(buttonState + 1)
  }

  return (
    <>
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={handleClick(good, setGood)} name='Good'/>
        <Button handleClick={handleClick(neutral, setNeutral)} name='Neutral'/>
        <Button handleClick={handleClick(bad, setBad)} name='Bad'/>

        <h1>Statistics</h1>
        
        <table>
          <tbody>
            <StatisticsLine name='Good' value={good}/>
            <StatisticsLine name='Neutral' value={neutral}/>
            <StatisticsLine name='Bad' value={bad}/>
          </tbody>
        </table>
        <hr/>
        <AllOutComes total={total} avg={avg} positive={positive}/>
      </div>

    </>

  )
}

export default App

import { useState } from 'react'
import './App.css'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(8).fill(0));
  const [mostVotes, setMostVotes] = useState(selected)

  const handleNextClick = () => {
    const selectedIndex = Math.floor( Math.random()*anecdotes.length );
    setSelected( selectedIndex);

  }

  const handleVotesClick = () => {
    const copy =  [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
   <>
     <div>
      <h3>Anecdotes of the Day</h3>
      <hr/>
      <div>
        <h2>{anecdotes[selected]}</h2>
        <small>~ {votes[selected]} votes</small>
      </div>
      <br />
      <div>
        <button onClick={handleVotesClick}>Vote</button>
        <button onClick={handleNextClick}>Next Anecdotes</button>
      </div>
    </div>
    <br />
    <br />
    <div>
      <h3>Anecdotes with most votes</h3>
      <hr/>
      <div>
        <h2>{anecdotes[votes.indexOf(Math.max(...votes))]}</h2>
        <small>~ {votes[votes.indexOf(Math.max(...votes))]} votes</small>
      </div>
      <br />
    </div>
   </>
    
  )
}

export default App

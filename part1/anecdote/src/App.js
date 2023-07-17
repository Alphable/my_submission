import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const Button = ({handle,text}) =>{
  if(text=='anecdote'){
    // 从7条中随机取一条
    return (
      <>
        <button onClick={handle}>{text}</button>
      </>
    )
  }else if(text=='vote'){
    return (
      <>
        <button onClick={handle}>{text}</button>
      </>
    )
    }
  }
  
function App() {
  const [index, setIndex] = useState(0)
  const [votes, setVote] = useState(Array(7).fill(0))
  const anecdotes = [
    '0. If it hurts, do it more often',
    '1. Adding manpower to a late software project makes it later!',
    '2. The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    '3. Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    '4. Premature optimization is the root of all evil.',
    '5. Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    '6. Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const handleIndex = () => {
    setIndex(Math.floor(Math.random()*7))
  }
  const handleVote = (index) => {
    // 先在副本变动，再更新到原数组
    const newVotes = [...votes]
    newVotes[index] += 1
    setVote(newVotes)
  }
  // console.log(votes)

  const findMost =(array) => {
    const max = Math.max(...array)
    const maxIndex = array.indexOf(max)
    return maxIndex
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[index]}
      <br/>
      which has {votes[index]} votes
      <br/>
      <Button handle={handleIndex} text='anecdote'/>
      <Button handle={() =>handleVote(index)} text='vote'/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[findMost(votes)]}
    </div>
  );
}

export default App;

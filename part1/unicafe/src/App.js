import { useState } from "react";

const Button = ({count, setCount, text}) =>{
  return <button onClick={() =>{setCount(count+1)}}>{text}</button>
}

const Statistics = (props) => {
  const sum = props.good+props.neutral+props.bad
  let average = (props.good+props.bad*(-1))/sum
  average = average.toFixed(2)
  let positive = props.good/sum*100
  positive = positive.toFixed(2)
  console.log(props.good, props.neutral, props.bad,average)
  if(props.good === 0 && props.neutral===0 && props.bad ===0){
    return(
      <div>No feedback given</div>
    )
  }else{
    return(
    <div>
      <table>
        <tbody>
          <tr>
            {/*  one row */}
            <StatisticLine text='good' value={props.good}/>
          </tr>
          <tr>
           <StatisticLine text='neutral' value={props.neutral}/>
          </tr>
          <tr>
            <StatisticLine text='bad' value={props.bad}/>
          </tr>
          <tr>
           <StatisticLine text='average' value={average}/>
          </tr>
          <tr>
            <StatisticLine text='positive' value={`${positive}%`}/>
          </tr>
        </tbody>
      </table>
    </div>
  )
  }
}
const StatisticLine = ({text,value}) =>{
  // 返回2个格子
  return(
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

function App() {
const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button count={good} setCount={setGood} text='GOOD'/>
      <Button count={neutral} setCount={setNeutral} text='NEUTRAL'/>
      <Button count={bad} setCount={setBad} text='BAD'/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      <hr/>
    </div>
  );
}

export default App;

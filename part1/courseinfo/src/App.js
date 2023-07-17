import logo from './logo.svg';
import './App.css';

const Header = (props) =>{
  console.log(props)
  return(
    <>
      <p>
        [23fall] {props.name}
      </p>
    </>
  )
}

const Content = (props) =>{
  console.log(props)
  return(
    <>
      <Part info={props.parts}/>
    </>
  )
}

const Total = (props) =>{
  console.log(props)
  return(
    <>
      <hr/>
      <p>
        Total {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}
      </p>
    </>
  )
}

const Part = (props) =>{
  console.log(props)
  return(
    <>
      <p>
        0 course {props.info[0].name}
      </p>
      <p>
          exercises {props.info[0].exercises}
      </p>
      <br/>
      <p>
        1 course {props.info[1].name}
      </p>
      <p>
          exercises {props.info[1].exercises}
      </p>
      <br/><p>
        2 course {props.info[2].name}
      </p>
      <p>
          exercises {props.info[2].exercises}
      </p>
      <br/>
    </>
  )
}


function App() {
  const course = {
    name:'Half Stack application development',
    parts : [
    {
      name:'Fundamentals of React',
      exercises: 10
    },
    

    {
      name:'Using props to pass data',
      exercises: 7
    },


    {
      name:'State of a component',
      exercises: 14
    }
    ]
}

  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>

      <Total parts={course.parts}/>

    </div>
  )
}

export default App;

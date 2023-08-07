import React from "react"
const Content = ({info}) => {
  // console.log(' name',info.name,', exercise',info.exercises)
  return (
    <li>{info.name}  {info.exercises}</li>
  )
}
const Header = (props) => {
  // console.log('header: ',props.courseName)
  return <h1>{props.courseName}</h1>
}
const Total = ({sumOfExercises}) => {
  return <p>total of exercises {sumOfExercises}</p>
}

const Course = ({course}) =>{
    // reduce(callback, 初始值)。这里callback的参数意义是设置好的，我们只是起个名字。
      const sumOfExercises = course.parts.reduce((previous,curPart) => 
      {return previous+curPart.exercises},0)
      return(
        <div>
          <Header courseName={course.name}/>
    
          {course.parts.map((part) =>{
            return(<Content key={part.id} info ={part}/>)
            }
          )}
          <Total sumOfExercises={sumOfExercises} />
          
        </div>
      )
    }

    export default Course
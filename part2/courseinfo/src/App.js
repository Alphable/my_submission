import React from 'react';
import Course from './components/Component'


// 组件结构
// App
//  Courses
//    Course
//      Header
//      Content
//        Part
//        Part
//        ...
//    Course
//      Header
//      Content
//        Part
//        Part
//        ...
const App = () => {
  const courses = [
    {
      id:1,
      name:'Half Stack application development',
      parts:[
        {
          name :'Fundamentals of React',
          exercises: 10,
          id:1
        },
        {
          name :'Using props to pass data',
          exercises: 7,
          id:2
        },
        {
          name :'State of a component',
          exercises: 14,
          id:3
        },
        {
          name :'Redux',
          exercises: 11,
          id:4
        },
      ]
    },
    {
      id:2,
      name:'Node.js',
      parts:[
        {
          name:'Routing',
          exercises:3,
          id:1
        },
        {
          name:'Middlewares',
          exercises:7,
          id:2
        }
      ]
    }
  ]


  // console.log(course.parts[0].exercises,course.parts[1].exercises,
  // course.parts[2].exercises,course.parts[3].exercises)
  // console.log('sumOfExercises:',sumOfExercises)
  return (
    <div>
      {courses.map(
        (course) =>{return (
        <Course key={course.id} course={course} />
        )}
      )}
    </div>
   
  )
}

export default App
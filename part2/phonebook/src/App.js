import './index.css'
import {Person,Notification} from './components/component'

import { useState,useEffect } from 'react';
import myService from './services/service'
const Filter = ({handelFilter}) => {
  return(
    <div>filter shown with<input onChange={handelFilter}/></div>
  )
}
const PersonsForm = ({add, newName, handelNameChange,newNumber,handelNumberChange}) => {
  return(
    <form onSubmit={add}>
    <div>name: <input value={newName} onChange={handelNameChange}/></div>
    <div>number: <input value={newNumber} onChange={handelNumberChange}/></div>
    <div>
      <button type='submit' >add</button>
    </div>
  </form>
  )
}


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('请输入姓名')
  const [newNumber, setNewNumber] = useState('请输入号码')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState('')
  const hook = () => {
    console.log('effect')
    myService.get().then(initalInfo => {
      setPersons(initalInfo)
      console.log('render', initalInfo.length, 'persons')
    }
    )
  }
  useEffect(hook, [])
  

  const handelNameChange = (event) =>{
// 更新newNote状态为输入的当前值
    setNewName(event.target.value)
  }
  const handelNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const add =(event) => {
    event.preventDefault() //阻止提交事件触发的默认操作
    const existedPerson = persons.find((person)=> person.name===newName)
    if (existedPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old 
      number with a new one?`)){
        myService.update(existedPerson.id, {...existedPerson, number:newNumber})
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === existedPerson.id ?
            returnedPerson : person))
          setNewName('请输入姓名')
          setNewNumber('请输入号码')
          setMessage(`Updated ${returnedPerson.name}.`)
          setTimeout(()=> setMessage(null), 3000)
        })
        .catch(()=>{
          setNewName('请输入姓名')
          setNewNumber('请输入号码')
          setMessage(`${newName} has already been removed from server.`)
          setTimeout(()=> setMessage(null), 3000)
        })
      }
    }else{
      const obj = {name: newName, number: newNumber}
      // add to server
      myService.create(obj).then(
        returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('请输入姓名')
          setNewNumber('请输入号码')
          setMessage(`Added ${returnedPerson.name}.`)
          setTimeout(()=> setMessage(null), 3000)
        }
      )
    }
    }

  const handelFilter = (event)=>{
    setNewFilter(event.target.value)
  }
// filter
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))


  const handleDeleteOf = (id)=>{
    if (window.confirm(`Delete ${persons.find(each => each.id === id).name} ?`)){
      myService.drop(id).then(()=>{
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`Removed ${persons.find(each => each.id === id).name}.`)
        setTimeout(()=> setMessage(null), 3000)
      })
      .catch(() => {
        setMessage(`Information of ${persons.find(each => each.id === id).name} 
        has already been removed from server.`)
        setTimeout(()=> setMessage(null), 3000)
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handelFilter={handelFilter}/>
      <h3>Add a new</h3>
      <PersonsForm add={add} newName={newName} handelNameChange={handelNameChange}
      newNumber={newNumber} handelNumberChange={handelNumberChange} />
      <h3>Numbers</h3>
      <ul>
        {
          filteredPersons.map(person => <Person key={person.id} person={person} handleDelete={()=>handleDeleteOf(person.id)}/>)
        }
      </ul>
    </div>
  );
}

export default App;

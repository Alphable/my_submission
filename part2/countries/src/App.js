import { useState, useEffect } from 'react';
import axios from 'axios';
const Country =({country}) => {
  // 按钮，按下后会显示该国家的视图
  const [show, setShow] = useState(false)
  return(
    <li>
      official name--{country.name.official}
      <button onClick={() => setShow(true)}>show</button>
      {show && <Info country={country}/>}
    </li>
  )
}
const Info = ({country}) => {
  return(
    <div>
      <h2>{country.name.official}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
          <ul>
          {Object.keys(country.languages).map(key => (
            <li key={key}>{key}: {country.languages[key]}</li>
          ))}
          </ul>
        <img src={country.flags.png}/>
        
    </div>

  )
}
const Weather = ({country}) => {
  const [weatherData, setWeatherData] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const hook = (name, api_key) =>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=metric`)
    .then(response=>{
      setWeatherData(response.data) //只保存返回的数据
    })
  }
  useEffect(()=>hook(country.name.official, api_key), [])
  return(
    <div>
      <h3>Weather in {country.capital}</h3>
      <div>
        {weatherData.main && (
          <>
            <p>temperature {weatherData.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
            <p>wind {weatherData.wind.speed} m/s</p>
          </>)
        }
      </div>
        
    </div>
  )
}

function App() {
  const [word, setWord] = useState('')
  const [countries, setCountries] = useState([])


  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('effect')
      setCountries(response.data)
    })
  }
  useEffect(hook, [])

  const handelFilter = (event) =>{
    //获取输入值到状态变量
    setWord(event.target.value)
  }

  // filter: 一个一个判等
  const filteredCountries = countries.filter(country => 
    country.name.official.toLowerCase().includes(word.toLowerCase()))


  return (
    <div>
      <div>find countries<input onChange={handelFilter}/></div>
      <div>
        {filteredCountries.length > 10 ?
        <p>Too many matches, specify another filter</p> :
        filteredCountries.length ==1 ?
        <>
        <Info country={filteredCountries[0]}/>
        <Weather country={filteredCountries[0]}/>
        </>:
        filteredCountries.map(country => <Country key={country.name.official} country={country}/>)
        }

      </div>
    </div>
  );
}

export default App;

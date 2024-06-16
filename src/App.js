import React, { useState } from 'react'

import './App.css';

const apiStatusConstants = {
  initial: 'INITIAL',
  in_progress: 'IN_Progress',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const App = () => {

  const [data, setData] = useState({})

  const [userInput, setUserInput] = useState("")

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)


  const onSearchLocation = async event => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&zip=${userInput}&units=imperial&appid=8c2a781f2bef1fe1d7a8ed49d7541a09`
    if (event.key === 'Enter') {
      setApiStatus(apiStatusConstants.in_progress)
      const response = await fetch(apiUrl)
      if (response.ok === true) {
        const jsonData = await response.json()
        setData(jsonData)
        setUserInput("")
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }
  }

  const renderLoader = () => (
    <div className="loader-container">
      <p className='text'>Loading...</p>
    </div>
  )

  const renderFailureView = () => (
    <div className='failure-container'>
      <img src="https://cdn3.iconfinder.com/data/icons/map-pins-v-2/512/map_pin_wrong_destination_forbidden_delete-512.png" alt="error" className='error-img' />
      <br />
      <p className='error-msg'>The entered location does not exists. Please, enter the correct one.</p>
    </div>
  )

  const renderLocation = () => (
    <>
    <div className='top-container'>
        <div className='location-container'>
          <p className='location'>{data.name}</p>
        </div>
        <div className='temparature-container'>
          {data.main ? <p className='temparature'>{data.main.temp.toFixed()}°F</p> : null}
        </div>
        <div className='description-container'>
          {data.weather ? <p className='description'>{data.weather[0].description}</p>: null}
        </div>
      </div>
      {data.name !== undefined && (
        <div className='bottom-container'>
        <div className='feels-like-container'>
          {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
          <p className='normal'>Feels Like</p>
        </div>
        <div className='humidity-container'>
          {data.main ? <p className='bold'>{data.main.humidity.toFixed()}%</p> : null}
          <p className='normal'>Humidity</p>
        </div>
        <div className='wind-container'>
          {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
          <p className='normal'>Wind Speed</p>
        </div>
      </div>
      )}
      </>
  )

  const renderDetails = () => {
    switch(apiStatus) {
      case apiStatusConstants.in_progress :
        return renderLoader()
      case apiStatusConstants.success :
        return renderLocation()
      case apiStatusConstants.failure :
        return renderFailureView()
      default :
        return null
    }
  }

  return (
  <div className="App">
    <div className='container'>
      <div className='search-container'>
        <input value={userInput} placeholder='Enter Location...' type='text' className='search-input' onChange={event => setUserInput(event.target.value)} onKeyPress={onSearchLocation} />
      </div>

      {renderDetails()}

    </div>
  </div>
  )
}


export default App;

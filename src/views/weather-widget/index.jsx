import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import "./styles.css"
import { weatherStore, weatherStoreGet } from '../../models/weather-store'

export const WeatherWidget = () => {
  const weatherStoreState = useStore(weatherStore)
  useEffect(() => {
    if (!weatherStoreState && !weatherStoreGet.pending.getState()) {
      weatherStoreGet()
    }
  }, [weatherStoreState])

  return (
    weatherStoreState && <div
      id='weatherModule'
    >
      <pre className='headerClass'>
        {weatherStoreState?.name !== undefined ? weatherStoreState?.name : ''}
      </pre>
      <pre className='textClass'>
        {weatherStoreState?.name !== undefined ? weatherStoreState?.main.temp + "°C " + weatherStoreState?.weather[0].main.toLowerCase()
          : ""}
      </pre>
    </div>
  )
}

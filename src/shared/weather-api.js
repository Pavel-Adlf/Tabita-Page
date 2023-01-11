import axios from 'axios'

const weatherApi = axios.create({
  baseURL: process.env.REACT_APP_API_WEATHER_URL,
  params: {
    appid: process.env.REACT_APP_API_WEATHER_KEY,
  },
})

export const weatherApiGetWeather = (latitude, longitude) =>
  weatherApi.get('/weather', {
    params: {
      lat: latitude,
      lon: longitude,
      units: 'metric'
    }
  })

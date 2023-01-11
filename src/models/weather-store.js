import { createStore, createEffect } from 'effector'

import { geoStore, geoStoreGet } from './geo-store'
import { weatherApiGetWeather } from '../shared/weather-api'

export const weatherStore = createStore(null)

export const weatherStoreGet = createEffect(async coords => {
    if (coords) {
        const response = await weatherApiGetWeather(coords.latitude, coords.longitude)
        return response.data
    } else {
        if (!geoStoreGet.pending.getState()) geoStoreGet()
        return null
    }
})

geoStore.watch((coords) =>
    weatherStoreGet(coords)
)

weatherStore.on(
    weatherStoreGet.done,
    (count, { params, result }) => result
)

import { createStore, createEffect } from 'effector'

import { geoApiGetPosition } from '../shared/geo-api'

export const geoStore = createStore(null)

export const geoStoreGet = createEffect(async () => {
    const response = await geoApiGetPosition()
    return {
      latitude: response.coords.latitude,
      longitude: response.coords.longitude,
    } ?? null
})

geoStore.on(
    geoStoreGet.done,
    (count, { params, result }) => result
)

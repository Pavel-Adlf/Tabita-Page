import { createStore, createEffect } from 'effector'
import ApplicationSettings from '../app-settings/ApplicationSettings'
import { unsplashApi } from '../shared/unsplash-api'

export const imageStore = createStore([])

export const imageStorePull = createEffect(async (args) => {
    const search = ApplicationSettings.search
    if (!args[1]) args[1] = search
    if (!args[0]) args[0] = 1
    let scape = ApplicationSettings.widgetSize[0] > ApplicationSettings.widgetSize[1]
    const request = await unsplashApi.search.getPhotos({
        page: args[0],
        query: args[1],
        perPage: 30,
        orientation: scape ? 'landscape' : 'portrait',
    })
    return request.response
})

imageStore.on(
  imageStorePull.done,
  (imageStoreValue, { result }) => {
      return result
  }
)

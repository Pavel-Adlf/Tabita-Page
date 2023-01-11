export const geoApiGetPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      maximumAge: 1000 * 60 * 10,
      timeout: 1000 * 20,
      enableHighAccuracy: false,
    })
  })

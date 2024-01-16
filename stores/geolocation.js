import { defineStore } from 'pinia';

export const useGeoStore = defineStore('geo', () => {
  let watchPositionID = null;
  const
    status = ref('Detecting location ...'),

    lon = ref(null),
    lat = ref(null),

    getGeo = () => {
      if (!navigator.geolocation) {
        status.value = 'Geolocation service not available';
      } else {
        status.value = 'Detecting location ...';

        watchPositionID = navigator.geolocation.watchPosition(
          position => {
            status.value = '';

            lon.value = position.coords.longitude;
            lat.value = position.coords.latitude;
          },
          () => { status.value = 'Geolocation error' },
          { enableHighAccuracy: true, maximumAge: 0 }
        )
      }
    },
    stopGeo = () => {
      navigator.geolocation.clearWatch(watchPositionID)
    };

    return {
      lon,
      lat,
      getGeo,
      stopGeo
    }
})

<script setup>
import { storeToRefs } from 'pinia';

import { useGeoStore } from '@/stores/geolocation';
import { useFormProfileStore } from '@/stores/form-profile';

const
  storeGeo = useGeoStore(),
  storeFormProfile = useFormProfileStore(),
  {
    geolocationLon: lonGeo,
    geolocationLat: latGeo
  } = storeToRefs(storeGeo),
  {
    edit,
    lon: lonProfile,
    lat: latProfile
  } = storeToRefs(storeFormProfile),

  hasProfileGeo = computed(() => !(!lonProfile.value || !latProfile.value)),
  hasGPSGeo = computed(() => !(!lonGeo.value || !latGeo.value)),

  zoom = ref(8),

  onDrag = e => {
    const
      { target: marker } = e,
      position = marker.getLatLng();

    lonProfile.value = position.lng;
    latProfile.value = position.lat;
  };
</script>

<template>
  <div id="profile-map">
    <LMap ref="map" :zoom="zoom"
      :center="hasProfileGeo ? [latProfile, lonProfile] : hasGPSGeo ? [latGeo, lonGeo] : [(10.4158 + 14.7046) / 2, (102.3134 + 107.6105) / 2]">
      <LTileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" layer-type="base" />

      <LMarker v-if="hasProfileGeo" :lat-lng="[latProfile, lonProfile]" :draggable="edit" @dragend="onDrag">
        <LIcon :icon-size="[30, 30]" :icon-anchor="[15, 29]" icon-url="/img/providers/icon-gps.png" />
      </LMarker>
    </LMap>
  </div>
</template>

<style lang="scss">
#profile-map {
  height: 360px;
  width: 100%;
}
</style>

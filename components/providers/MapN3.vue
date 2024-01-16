<script setup>
import { storeToRefs } from 'pinia';

import { useProvidersStore } from '@/stores/providers';
import { useGeoStore } from '@/stores/geolocation';

const
  storeProviders = useProvidersStore(),
  storeGeo = useGeoStore(),
  { selected, providersListFiltered } = storeToRefs(storeProviders),
  { lon, lat } = storeToRefs(storeGeo),

  zoom = ref(8),
  markersSP = computed(
    () => providersListFiltered.value.filter(provider => !(!provider.lon || !provider.lat))
  ),

  onMarkerClick = id => { selected.value = id; };
</script>

<template>
  <div id="provider-map">
    <LMap ref="map" :zoom="zoom" :center="[(10.4158 + 14.7046) / 2, (102.3134 + 107.6105) / 2]">
      <LTileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" layer-type="base" />
      <LFeatureGroup>
        <LMarker v-for="marker in markersSP" :key="marker._id" :lat-lng="[marker.lat, marker.lon]"
          @click="() => { onMarkerClick(marker._id) }">
          <LIcon :icon-size="selected === marker._id ? [56, 65] : [52, 60]"
            :icon-anchor="selected === marker._id ? [28, 64] : [26, 57]"
            :icon-url="selected === marker._id ? '/img/providers/icon-sp-selected.png' : '/img/providers/icon-sp.png'" />
        </LMarker>
      </LFeatureGroup>

      <LMarker v-if="lon && lat" :lat-lng="[lat, lon]">
        <LIcon :icon-size="[30, 30]" :icon-anchor="[15, 29]" icon-url="/img/providers/icon-gps.png" />
      </LMarker>
    </LMap>
  </div>
</template>

<style lang="scss">
#provider-map {
  height: 100vh;
  width: 100vw;
}
</style>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const
  props = defineProps({
    provider: { type: Object, required: false },
    client: { type: Object, required: false }
  }),

  iconProvider = L.icon({ iconSize: [52, 60], iconAnchor: [26, 57], iconUrl: '/img/icon-sp.png' }),
  iconFarmer = L.icon({ iconSize: [52, 60], iconAnchor: [26, 57], iconUrl: '/img/icon-farmers.png' }),

  markerProvider = L.marker(L.latLng(props.provider.lat, props.provider.lon), { icon: iconProvider }),
  markerFarmer = L.marker(L.latLng(props.client.lat, props.client.lon), { icon: iconFarmer }),

  featureGroup = L.featureGroup([markerProvider, markerFarmer]),

  initMap = () => {
    const
      map = L
        .map('services-map', { zoomControl: false })
        .fitBounds([
          [10.4158, 102.3134],
          [14.7046, 107.6105]
        ], { padding: [25, 25] });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    featureGroup.addTo(map);

    map.fitBounds(featureGroup.getBounds(), { padding: [25, 25] });
  };

setTimeout(initMap, 250);
</script>

<template>
  <div id="services-map" class="mt-6 rounded-lg" style="height: 240px" />
</template>

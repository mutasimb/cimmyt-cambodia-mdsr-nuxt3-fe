<script setup>
import { storeToRefs } from 'pinia';
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useProvidersStore } from '@/stores/providers';

const
  props = defineProps({
    items: { type: Array, default: [] }
  }),

  storeProviders = useProvidersStore(),
  { selected } = storeToRefs(storeProviders),

  iconProvs = {
    default: L.icon({ iconSize: [52, 60], iconAnchor: [26, 57], iconUrl: '/img/icon-sp.png' }),
    selected: L.icon({ iconSize: [56, 65], iconAnchor: [28, 64], iconUrl: '/img/icon-sp-selected.png' })
  },
  // iconShops = L.icon({ iconSize: [52, 60], iconAnchor: [26, 57], iconUrl: '/img/icon-shops.png' }),
  // iconMechs = L.icon({ iconSize: [52, 60], iconAnchor: [26, 57], iconUrl: '/img/icon-mechanics.png' }),
  // iconSelectedShops = L.icon({ iconSize: [56, 65], iconAnchor: [28, 64], iconUrl: '/img/icon-shops-selected.png' }),
  // iconSelectedMechs = L.icon({ iconSize: [56, 65], iconAnchor: [28, 64], iconUrl: '/img/icon-mechanics-selected.png' }),

  onMarkerClick = e => {
    const
      { target: marker } = e,
      { id } = marker.options;

    selected.value = id;
  },

  markersSP = props.items
    .filter(item => !(!item.lon || !item.lat))
    .map(
      item => L
        .marker(
          L.latLng(item.lat, item.lon),
          { icon: iconProvs.default, id: item._id }
        )
        .on('click', onMarkerClick)
    ),

  featureGroupSPs = L.featureGroup(markersSP),

  selectMarker = id => {
    featureGroupSPs.eachLayer(layer => {
      if (id == layer.options.id) {
        const
          item = props.items.find(item => item._id === id),
          newMarker = L
            .marker(
              L.latLng(item.lat, item.lon),
              { icon: iconProvs.selected, id: item._id }
            )
            .on('click', onMarkerClick);

        featureGroupSPs.removeLayer(layer);
        featureGroupSPs.addLayer(newMarker);
      }
    });
  },

  unselectMarker = id => {
    featureGroupSPs.eachLayer(layer => {
      if (id == layer.options.id) {
        const
          item = props.items.find(item => item._id === id),
          newMarker = L
            .marker(
              L.latLng(item.lat, item.lon),
              { icon: iconProvs.default, id: item._id }
            )
            .on('click', onMarkerClick);

        featureGroupSPs.removeLayer(layer);
        featureGroupSPs.addLayer(newMarker);
      }
    })
  };

// useProvidersStore.$subscribe((_, state) => {
//   state.selected
// });

watch(selected, (val, oldVal) => {
  if (oldVal) unselectMarker(oldVal);
  if (val) selectMarker(val);
});

const initMap = () => {
  const
    map = L.map('provider-map', {
      zoomControl: false
    }).fitBounds([
      [10.4158, 102.3134],
      [14.7046, 107.6105]
    ], {
      padding: [25, 25]
    });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  featureGroupSPs.addTo(map);
  // lgj.addTo(map);

  map.fitBounds(featureGroupSPs.getBounds(), {
    padding: [25, 25]
  });
};

setTimeout(initMap, 250);
</script>

<template>
  <div id="provider-map" style="height: 100%" />
</template>

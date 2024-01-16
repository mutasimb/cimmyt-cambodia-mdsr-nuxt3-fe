<script lang="ts" setup>
const
  selectedCategory = ref(""),
  btns = [
    { label: "All", value: "" },
    { label: "Service Providers", value: "sp" },
    { label: "Mechanics", value: "mechanic" },
    { label: "Shops", value: "shop" }
  ];
</script>

<template>
  <v-btn-toggle
    class="text-primary-black"
    v-model="selectedCategory"
    color="primary-700"
    mandatory
    density="compact"
    variant="flat"
  >
    <v-btn
      v-for="btn in btns"
      :key="btn.value"
      class="text-primary-black b-200"
      selected-class="text-white"
      :value="btn.value"
      height="32"
      border
      :ripple="false"
    >{{ btn.label }}</v-btn>
  </v-btn-toggle>
</template>

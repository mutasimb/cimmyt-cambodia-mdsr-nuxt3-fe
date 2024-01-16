<template>
  <v-sheet :height="76" class="py-4 px-6 d-flex align-center">
    <v-text-field
      id="provider-search-text-field"
      hide-details
      single-line
      variant="outlined"
      density="compact"
      placeholder="Search for provider, mechanics or manufacturers"
      disabled
      style="cursor: not-allowed !important;"
    />

    <v-sheet
      :height="40"
      :width="40"
      class="ml-4 d-flex justify-center align-center rounded-lg"
      style="border: 1px solid rgb(171, 171, 171);"
    >
      <v-img src="/img/providers/btn-filter.png" :height="24" :width="24"/>
    </v-sheet>

  </v-sheet>
</template>

<style lang="scss">
#provider-search-text-field {
  cursor: not-allowed !important;
}
</style>

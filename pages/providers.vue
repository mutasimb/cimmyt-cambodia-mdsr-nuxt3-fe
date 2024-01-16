<script setup>
import { reloadNuxtApp } from "nuxt/app";
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';

import { useProvidersStore } from '@/stores/providers';
import { useGeoStore } from '@/stores/geolocation';

// definePageMeta({
//   middleware: (to, from) => {
//     if (from.path === localePath('/login')) reloadNuxtApp();
//   }
// })

const
  route = useRoute(),
  { mdAndDown, xs } = useDisplay(),

  storeGeo = useGeoStore(),
  storeProviders = useProvidersStore(),
  { providersList, loading, selected, drawerLeft, drawerDetails, drawerFilter } = storeToRefs(storeProviders),

  // widthCardsDrawer = computed(
  //   () => xs.value ? '100%'
  //     : mdAndDown.value ? '360'
  //       : '616'
  // ),

  onClickFilter = () => {
    if (!drawerFilter.value && selected.value) selected.value = null;
    drawerFilter.value = !drawerFilter.value;
  };

storeProviders.getProviders();

watch(
  selected,
  val => {
    drawerDetails.value = val ? true : false;
    navigateTo({ path: val ? `/providers/${val}` : '/providers' })
  },
  { immediate: true }
);

storeGeo.getGeo();
onBeforeUnmount(() => { storeGeo.stopGeo(); });
</script>

<template>
  <v-container class="fill-height flex-column align-stretch pa-0" fluid>
    <v-navigation-drawer v-if="!loading && providersList && providersList.length" id="provider-cards-drawer"
      v-model="drawerLeft" class="provider-nav py-6 px-4" width="584">
      <v-sheet :height="40" :width="40"
        class="provider-left-darwer-toggle-btn d-flex justify-center align-center rounded-lg cursor-pointer"
        @click="() => { drawerLeft = false }">
        <v-img src="/img/direction-left-rectangle.png" height="24" width="24" />
      </v-sheet>

      <div class="d-flex justify-space-between">
        <div class="h-300-heavy text-primary-neutral-900">{{ $t('p1_sp_title') }}</div>
        <v-sheet :height="40" :width="40" class="ml-4 d-flex justify-center align-center rounded-lg cursor-pointer"
          style="border: 1px solid rgb(171, 171, 171);" @click="onClickFilter">
          <v-img src="/img/providers/btn-filter.png" :height="24" :width="24" />
        </v-sheet>
      </div>

      <!-- <ProvidersTypeBtnToggle class="my-6"/> -->

      <ProvidersCards class="my-6" />
    </v-navigation-drawer>

    <v-navigation-drawer v-if="!drawerLeft" id="toggle-provider-cards-drawer" class="provider-nav pa-0" width="16">
      <v-sheet :height="40" :width="40"
        class="provider-right-darwer-toggle-btn d-flex justify-center align-center rounded-lg cursor-pointer"
        @click="() => { drawerLeft = true }">
        <v-img src="/img/direction-right-rectangle.png" height="24" width="24" />
      </v-sheet>
    </v-navigation-drawer>

    <!-- <ProvidersSearchBar/> -->

    <v-row class="ma-0">
      <v-col class="pa-0">
        <ProvidersMapN3 v-if="!loading && providersList && providersList.length" />
      </v-col>
    </v-row>

    <v-navigation-drawer id="provider-detail-drawer" v-model="drawerDetails" location="right" width="443">
      <NuxtPage />
    </v-navigation-drawer>

    <!-- <v-navigation-drawer id="provider-filter-drawer" v-model="drawerFilter" location="right" width="290">
      <ProvidersFilter />
    </v-navigation-drawer> -->
  </v-container>
</template>

<style lang="scss">
#provider-filter-drawer {
  z-index: 2000 !important;
}

#toggle-provider-cards-drawer {
  transform: translateX(0) !important;
}

#provider-cards-drawer {
  max-width: calc(100% - 56px) !important;
}

.provider-left-darwer-toggle-btn,
.provider-right-darwer-toggle-btn {
  position: absolute;
  right: 0;
  top: 80px;
  transform: translate(50%);

  z-index: -1;
}

.provider-nav>.v-navigation-drawer__content {
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #94A0B8;
    border-radius: 8px;
  }

  /* &::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  } */
}
</style>

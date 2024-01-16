<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';

const
  { locale, setLocale } = useI18n(),
  router = useRouter(),
  storeAuth = useAuthStore(),
  { user } = storeToRefs(storeAuth),

  btnLocale = computed(() => locale.value),
  rail = ref(true),
  itemsNav = [
    { value: "providers", icon: 'mdi-account-group', title: "Service Provider" },
    { value: "services", icon: 'mdi-bag-personal', title: "Services" },
    { value: "profile", icon: 'mdi-account', title: "Profile" },
    { value: "info-hub", icon: 'mdi-folder-open', title: "Knowledge Hub" },
    // { value: "notifications", icon: 'mdi-bell', title: "Notifications" }
  ],

  displayPicture = computed(
    () => !user.value ? null
      : user.value.picture ? user.value.picture
        : `https://ui-avatars.com/api/?size=80&background=F1F3F9&color=28303F&name=${user.value.name.split(' ').join('+')
        }`
  ),

  onClickNavIcon = () => {
    rail.value = !rail.value;
  },
  onLogout = () => {
    useRemoveStorage('token');
    setTimeout(() => { router.push({ path: "/login" }); }, 250);
  };
</script>

<template>
  <v-navigation-drawer id="app-drawer" class="bg-primary-900" :rail="rail" permanent>
    <v-list>
      <v-app-bar-nav-icon class="mx-1" @click="onClickNavIcon" />

      <v-divider class="my-2" />

      <v-list-item v-for="itemNav in itemsNav" :key="itemNav.value" :title="$t(itemNav.title)" :to="'/' + itemNav.value"
        :value="itemNav.value" class="p-200-light" active-class="bg-secondary-700 nav-active">
        <template #prepend>
          <v-icon :icon="itemNav.icon" style="opacity: 1;" />
        </template>
      </v-list-item>
    </v-list>

    <v-list>
      <v-list-item class="px-3" :title="btnLocale === 'km-KH' ? 'Khmer' : 'អង់គ្លេស'">
        <template #prepend>
          <v-avatar :size="32">
            <v-icon icon="mdi-web" color="white" />
          </v-avatar>
        </template>
        <template #append>
          <v-menu location="top">
            <template #activator="{ props }">
              <v-btn v-bind="props" variant="text" icon="mdi-chevron-right" />
            </template>

            <v-list>
              <v-list-item @click="() => { setLocale('en-US') }">
                <v-list-item-title>English</v-list-item-title>
              </v-list-item>
              <v-list-item @click="() => { setLocale('km-KH') }">
                <v-list-item-title>ខ្មែរ</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>

      <v-list-item v-if="user" class="px-3" :title="user.name" :subtitle="user.phone">
        <template #prepend>
          <v-avatar :size="32">
            <v-icon v-if="!displayPicture" icon="mdi-account-circle" color="white" />
            <v-img v-else :src="displayPicture" />
          </v-avatar>
        </template>
        <template #append>
          <v-btn variant="text" icon="mdi-logout" @click="onLogout" />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style lang="scss">
#app-drawer>.v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>

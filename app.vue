<script setup>
import { useAuthStore } from '@/stores/auth';

const storeAuth = useAuthStore();

storeAuth.getToken();
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

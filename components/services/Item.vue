<script setup>
const
  emit = defineEmits(['select']),
  props = defineProps({
    name: { type: String, default: '' },
    service: { type: String, default: '' },
    active: { type: Boolean, default: false },
  }),
  onClick = () => { emit('select'); };
</script>

<template>
  <v-list-item class="service-item mt-2 pa-3 rounded-lg cursor-pointer" :class="{ active }" @click="onClick">
    <template #prepend>
      <v-avatar color="grey-lighten-1" size="80">
        <v-img
          :src="`https://ui-avatars.com/api/?size=80&background=F1F3F9&color=28303F&name=${props.name.split(' ').join('+')}`" />
      </v-avatar>
    </template>

    <template #default>
      <v-chip class="mb-2" color="secondary-black" size="x-small" variant="outlined">{{ $t('p2_txt_upcoming') }}</v-chip>
      <div class="p-100-heavy text-primary-black">{{ $t(props.service) }}</div>
      <div class="p-200-light">by {{ props.name }}</div>
    </template>
  </v-list-item>
</template>

<style lang="scss">
.service-item {
  border: 2px solid #E1E6EF;

  &.active {
    border: 2px solid #179778;
  }
}
</style>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const
  emit = defineEmits(['select']),
  propsComp = defineProps<{
    id: string
    name: string
    imageMachine: string
    imageProfile: string
    phone: string
    active: boolean
  }>(),
  onClick = () => { emit('select'); },

  { lgAndUp } = useDisplay(),

  cardWidth = computed(() => lgAndUp.value ? 'calc(50% - 0.5rem)' : '100%');
</script>

<template>
  <v-hover>
    <template #default="{ isHovering, props }">
      <v-card v-bind="props" class="provider-card mb-6 rounded-lg elevation-0 cursor-pointer"
        :class="{ 'e-400': isHovering, active: propsComp.active }" @click="onClick" :to="`/providers/${propsComp.id}`">
        <v-img height="184" :src="propsComp.imageMachine" cover />
        <v-list-item class="mt-4">
          <template #prepend>
            <v-avatar :size="80">
              <v-img :src="propsComp.imageProfile" />
            </v-avatar>
          </template>

          <template #title>
            <div class="p-100-heavy text-primary-black">{{ propsComp.name }}</div>
          </template>

          <template #subtitle>
            <div class="p-200-light text-secondary-black">
              <!-- <v-img src="~/assets/svg/calling.svg" width="20" class="d-inline" /> -->
              {{ propsComp.phone }}
            </div>
          </template>

          <!-- <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
          <v-list-item-subtitle>{{ phone }}</v-list-item-subtitle>
        </v-list-item-content> -->
        </v-list-item>
      </v-card>
    </template>
  </v-hover>
</template>

<style lang="scss" scoped>
.provider-card {
  flex-basis: v-bind('cardWidth');
  height: 302px;
  border: 2px solid #E1E6EF;

  &.active {
    border: 2px solid #179778;
  }
}
</style>

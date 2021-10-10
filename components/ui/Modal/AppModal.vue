<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
  >
    <div @click="$emit('close')"
         class="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50"></div>

    <div :class="modalClass" class="bg-dark rounded-md z-30">
      <div class="p-4 border-b border-black border-opacity-20 flex justify-between">
        <span>{{ title }}</span>
        <span class="cursor-pointer" @click="$emit('close')">
          <fa-icon icon="times" />
        </span>
      </div>
      <div class="p-4 border-b border-black border-opacity-20">
        <slot />
      </div>
      <div class="p-4">
        <app-btn v-if="ok" @click="$emit('ok')">{{ ok }}</app-btn>
        <app-btn @click="$emit('close')">{{ close || 'Отмена' }}</app-btn>
      </div>
    </div>
  </div>
</template>

<script>
import AppBtn from "../Buttons/AppBtn";
export default {
  name: "AppModal",
  components: {AppBtn},
  props: ['title', 'ok', 'modalClass', 'close']
}
</script>

<style scoped>

</style>

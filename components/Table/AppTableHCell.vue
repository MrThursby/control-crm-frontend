<template>
  <th class="py-3 px-2 sticky top-0" :class="center ? 'text-center' : 'text-left'">
    <slot />
  </th>
</template>

<script>
export default {
  name: "AppTableHCell",
  props: {
    center: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>

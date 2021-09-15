<template>
  <div
    class="container px-4"
    :class="`mx-${mx}`"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppContainer",
  props: {
    mx: { type: String, default: 'auto' }
  }
}
</script>

<style scoped>

</style>

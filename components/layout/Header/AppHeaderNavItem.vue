<template>
  <component :is="tag">
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppHeaderNavItem",
  props: {
    tag: { type: String, default: 'nuxt-link' }
  }
}
</script>

<style scoped>

</style>

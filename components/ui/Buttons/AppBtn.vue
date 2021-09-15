<template>
  <component
    class="bg-primary px-4 py-3"
    :class="`rounded-${rounded} px-${px} py-${py}`"
    :is="tag"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppBtn",
  props: {
    tag: { type: String, default: 'button' },
    rounded: { type: String, default: 'full' },
    px: { type: String, default: '6' },
    py: { type: String, default: '4' },
  }
}
</script>

<style scoped>

</style>

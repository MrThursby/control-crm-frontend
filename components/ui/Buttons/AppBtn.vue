<template>
  <component
    class="bg-primary font-semibold"
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
    rounded: { type: String, default: 'md' },
    px: { type: String, default: '4' },
    py: { type: String, default: '3' },
  }
}
</script>

<style scoped>

</style>

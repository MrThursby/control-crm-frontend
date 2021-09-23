<template>
  <component
    @click="$emit('click')"
    class="bg-primary font-semibold"
    :class="[
      `rounded-${rounded} px-${px} py-${py}`,
      {'bg-opacity-40 text-light text-opacity-60 cursor-default': disabled}
    ]"
    :disabled="disabled"
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
    disabled: { type: Boolean, default: false}
  }
}
</script>

<style scoped>

</style>

<template>
  <component
    :is="tag"
    :to="to"
    :href="to"
    @click.prevent="$emit('click')"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: "AppLink",
  props: {
    tag: { type: String, default: 'nuxt-link' },
    to: { type: String, default: '' },
    variant: { type: String, default: 'primary' },
  }
}
</script>

<style scoped>

</style>

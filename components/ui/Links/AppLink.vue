<template>
  <component
    class="underline text-primary-light"
    @click="$emit('click', $event)"
    :is="tag"
    :to="to"
    :href="to"
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

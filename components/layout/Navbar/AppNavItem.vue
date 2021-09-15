<template>
  <component
    class="w-12 h-12 mt-2 flex rounded items-center justify-center text-light hover:bg-black hover:bg-opacity-10 transition duration-150"
    active-class="bg-black bg-opacity-30 hover:bg-opacity-30"
    :exact="exact"
    :title="title"
    :is="tag"
    :href="to"
    :to="to"
  >
    <slot />
  </component>
</template>

<script>
import AppLink from "../../ui/Links/AppLink";
export default {
  name: "AppNavItem",
  props: {
    tag: { type: String, default: 'nuxt-link' },
    to: { type: String, required: true },
    title: { type: String, default: '' },
    icon: { type: String, default: 'home' },
    exact: { type: Boolean, default: false },
  },
  components: {AppLink}
}
</script>

<style scoped>

</style>

<template>
  <li>
    <nuxt-link
      class="block py-3 px-4 rounded-md bg-white bg-opacity-5 font-semibold whitespace-nowrap"
      active-class="active"
      :exact="exact"
      :to="to">
      <slot/>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: "PageNavItem",
  props: {
    to: { type: String, default: '#' },
    exact: { type: Boolean, default: () => false }
  }
}
</script>

<style scoped>
.active {
  @apply bg-primary;
}
</style>

<template>
  <nav class="bg-primary flex flex-col items-center">
    <app-nav-item
      v-for="(item, index) of menu"
      :title="item.title"
      :to="item.to"
      :key="index"
      :exact="item.exact"
    ><fa-icon :icon="item.icon" /></app-nav-item>
  </nav>
</template>

<script>
import AppNavItem from "./AppNavItem";
export default {
  name: "AppNavBar",
  computed: {
    menu() {
      return this.$store.getters['app/menu']
    },
  },
  components: {AppNavItem}
}
</script>

<style scoped>

</style>

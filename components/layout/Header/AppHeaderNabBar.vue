<template>
  <nav>
    <app-header-nav-item
      v-for="(item, index) of menu"
      :key="index"
    >{{ item.title }}</app-header-nav-item>
  </nav>
</template>

<script>
import AppHeaderNavItem from "./AppHeaderNavItem";
export default {
  name: "AppHeaderNabBar",
  computed: {
    menu() {
      return this.$store.getters["app/menu"]
    }
  },
  components: {AppHeaderNavItem}
}
</script>

<style scoped>

</style>

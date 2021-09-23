<template>
  <div class="flex">
    <app-nav-bar class="fixed w-16 pt-16 h-screen flex-shrink-0 hidden md:flex" />
    <main class="flex md:ml-16 flex-col w-full bg-dark text-light min-h-screen">
      <app-header class="mb-12" />
      <nuxt />
    </main>
  </div>
</template>

<script>
import AppHeader from "../components/layout/Header/AppHeader";
import AppNavBar from "../components/layout/Navbar/AppNavBar";
export default {
  name: "default",
  components: {AppNavBar, AppHeader}
}
</script>

<style scoped>

</style>

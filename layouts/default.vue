<template>
  <div class="flex max-w-screen overflow-x-hidden">
    <app-nav-bar class="fixed w-16 pt-16 h-screen flex-shrink-0 hidden md:flex" />
    <div class="w-16 flex-shrink-0 hidden md:flex"></div>

    <main class="flex flex-col bg-dark text-light min-h-screen pb-4 min-w-0 w-full">
      <app-header class="mb-12" />
      <div class="overflow-x-auto h-full">
        <nuxt />
      </div>
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

<style>
body {
  @apply bg-dark;
}
</style>

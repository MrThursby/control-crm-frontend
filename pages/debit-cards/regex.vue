<template>
  <app-container class="mt-4">
    <cards-nav />
  </app-container>
</template>

<script>
import AppContainer from "../../components/layout/Container/AppContainer";
import CardsNav from "../../components/pages/Cards/CardsNav";
export default {
  name: "CardRegex",
  components: {CardsNav, AppContainer}
}
</script>

<style scoped>

</style>

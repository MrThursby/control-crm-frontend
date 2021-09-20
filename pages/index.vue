<template>
  <app-container class="pt-10">
    <div
      class="flex justify-center gap-5"
    >
      <page-nav>Сегодня</page-nav>
      <page-nav>Неделя</page-nav>
      <page-nav>Месяц</page-nav>
      <page-nav>Выбрать</page-nav>
    </div>
  </app-container>
</template>

<script>
import AppContainer from "../components/layout/Container/AppContainer";
import AppBtn from "../components/ui/Buttons/AppBtn";
import PageNav from "../components/ui/PageNav/PageNav";
export default {
  components: {PageNav, AppBtn, AppContainer}
}
</script>

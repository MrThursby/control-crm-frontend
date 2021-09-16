<template>
  <app-container class="pt-10">
    <div
      class="flex justify-center gap-5"
    >
      <app-btn rounded="md" py="2">Сегодня</app-btn>
      <app-btn rounded="md" py="2">Неделя</app-btn>
      <app-btn rounded="md" py="2">Месяц</app-btn>
      <app-btn rounded="md" py="2">Выбрать</app-btn>
<!--      <app-btn rounded="lg">Неделя</app-btn>
      <app-btn rounded="lg">Месяц</app-btn>
      <app-btn rounded="lg">Выбрать</app-btn>-->
    </div>
  </app-container>
</template>

<script>
import AppContainer from "../components/layout/Container/AppContainer";
import AppBtn from "../components/ui/Buttons/AppBtn";
export default {
  components: {AppBtn, AppContainer}
}
</script>

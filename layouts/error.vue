<template>
  <app-container>
    <h1 class="text-3xl">{{ pageTitle }}</h1>
  </app-container>
</template>

<script>
import AppContainer from "../components/layout/Container/AppContainer";
export default {
  name: "error",
  components: {AppContainer},
  computed: {
    pageTitle() {
      let titles = {
        404: 'Страница не найдена',
        403: 'Доступ запрещён',
        default: 'Неизвестная ошибка',
      }

      return titles[this.error.statusCode] || titles["default"]
    }
  },
  props: ['error']
}
</script>

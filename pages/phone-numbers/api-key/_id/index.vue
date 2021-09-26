<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">Главная</breadcrumbs-item>
      <breadcrumbs-item to="/phone-numbers">Номера</breadcrumbs-item>
      <breadcrumbs-item to="/phone-numbers/api-key">API-ключи</breadcrumbs-item>
      <breadcrumbs-item :to="`/phone-numbers/api-key/${$route.params.id}`">API-ключ #{{ $route.params.id }}</breadcrumbs-item>
    </breadcrumbs-list>


    <info-list class="mb-6">
      <h1 class="text-bold text-2xl mb-4">Информация</h1>
      <div class="w-1/3">
        <info-item name="API-ключ">{{ api_key.api_key }}</info-item>
        <info-item name="App ID">{{ api_key.app_id }}</info-item>
        <info-item name="Добавлено">{{ $moment(api_key.created_at) }}</info-item>
      </div>
    </info-list>

    <app-btn class="mr-4">Редактировать</app-btn>
    <app-btn danger>Удалить</app-btn>
  </app-container>
</template>

<script>
import AppContainer from "../../../../components/layout/Container/AppContainer";
import BreadcrumbsList from "../../../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../../../components/ui/Breadcrumbs/BreadcrumbsItem";
import InfoItem from "../../../../components/ui/InfoList/InfoItem";
import InfoList from "../../../../components/ui/InfoList/InfoList";
import AppBtn from "../../../../components/ui/Buttons/AppBtn";
export default {
  name: "DebitCardsShow",
  async fetch({ store, params }) {
    await store.dispatch('phone-numbers/fetchApiKey', params.id)
  },
  computed: {
    api_key() {
      return this.$store.getters["phone-numbers/api_key"]
    }
  },
  components: {AppBtn, InfoList, InfoItem, BreadcrumbsItem, BreadcrumbsList, AppContainer}
}
</script>

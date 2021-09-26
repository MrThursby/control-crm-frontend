<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">Главная</breadcrumbs-item>
      <breadcrumbs-item to="/debit-cards">Дебетовые карты</breadcrumbs-item>
      <breadcrumbs-item to="/debit-cards/provider">Поставщики</breadcrumbs-item>
      <breadcrumbs-item :to="`/debit-cards/provider/${$route.params.id}`">Поставщик #{{ $route.params.id }}</breadcrumbs-item>
    </breadcrumbs-list>


    <info-list class="mb-6">
      <h1 class="text-bold text-2xl mb-4">Информация</h1>
      <div class="w-1/3">
        <info-item name="Название">{{ provider.title }}</info-item>
        <info-item name="Добавлено">{{ $moment(provider.created_at) }}</info-item>
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
    await store.dispatch('debit-cards/fetchProvider', params.id)
  },
  computed: {
    provider() {
      return this.$store.getters["debit-cards/provider"]
    }
  },
  components: {AppBtn, InfoList, InfoItem, BreadcrumbsItem, BreadcrumbsList, AppContainer}
}
</script>

<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">Главная</breadcrumbs-item>
      <breadcrumbs-item to="/cards">Дебетовые карты</breadcrumbs-item>
      <breadcrumbs-item to="/cards/regex-banks">Регулярки</breadcrumbs-item>
      <breadcrumbs-item :to="`/cards/regex-banks/${$route.params.id}`">Регулярка #{{ $route.params.id }}</breadcrumbs-item>
    </breadcrumbs-list>


    <info-list class="mb-6">
      <h1 class="text-bold text-2xl mb-4">Информация</h1>
      <info-col>
        <info-item name="Регулярка">{{ regex_bank.regex }}</info-item>
        <info-item name="Банк">{{ regex_bank.bank_id }}</info-item>
        <info-item name="Добавлено">{{ $moment(regex_bank.created_at).format('LLL') }}</info-item>
      </info-col>
    </info-list>

    <app-btn @click="$router.push(`/cards/regex-banks/${$route.params.id}/edit`)" class="mr-4">Редактировать</app-btn>
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
import {mapGetters} from "vuex";
import InfoCol from "../../../../components/ui/InfoList/InfoCol";
export default {
  name: "DebitCardsShow",
  async fetch({ store, params }) {
    await store.dispatch('cards/regex-banks/fetchItem', params.id)
  },
  computed: {
    ...mapGetters({
      regex_bank: 'cards/regex-banks/item'
    })
  },
  components: {InfoCol, AppBtn, InfoList, InfoItem, BreadcrumbsItem, BreadcrumbsList, AppContainer}
}
</script>

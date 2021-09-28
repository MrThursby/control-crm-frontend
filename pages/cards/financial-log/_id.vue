<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">Главная</breadcrumbs-item>
      <breadcrumbs-item to="/cards">Дебетовые карты</breadcrumbs-item>
      <breadcrumbs-item to="/cards/financial-log">Финансовый лог</breadcrumbs-item>
      <breadcrumbs-item :to="`/cards/financial-log/${$route.params.id}`">Строка #{{ $route.params.id }}</breadcrumbs-item>
    </breadcrumbs-list>

    <info-list class="mb-6">
      <h1 class="text-bold text-2xl mb-4">Информация</h1>
      <div class="flex flex-wrap">
        <info-col>
          <info-item name="Сумма">{{ item.sum }}</info-item>
          <info-item name="Тип">{{ item.type }}</info-item>
          <info-item name="Дата">{{ $moment(item.date).format('LLL') }}</info-item>
          <info-item name="Отправитель">{{ item.sender }}</info-item>
          <info-item name="Текст">{{ item.text }}</info-item>
        </info-col>
        <info-col>
          <info-item class="break-all" name="Хэш">{{ item.md5text }}</info-item>
          <info-item name="Баланс">{{ item.balance }}</info-item>
          <info-item name="Банк">
            <app-link :to="`/cards/banks/${item.bank.id}`">
              {{ item.bank.title }}
            </app-link>
          </info-item>
          <info-item name="Карта">
            <app-link :to="`/cards/${item.card.id}`">
              {{ item.card.card }}
            </app-link>
          </info-item>
          <info-item name="Добавлено">{{ $moment(item.created_at).format('LLL') }}</info-item>
        </info-col>
      </div>
    </info-list>

    <app-btn class="mr-4">Редактировать</app-btn>
    <app-btn danger>Удалить</app-btn>
  </app-container>
</template>

<script>
import AppContainer from "../../../components/layout/Container/AppContainer";
import BreadcrumbsList from "../../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../../components/ui/Breadcrumbs/BreadcrumbsItem";
import InfoItem from "../../../components/ui/InfoList/InfoItem";
import InfoList from "../../../components/ui/InfoList/InfoList";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import {mapGetters} from "vuex";
import AppLink from "../../../components/ui/Links/AppLink";
import InfoCol from "../../../components/ui/InfoList/InfoCol";
export default {
  name: "DebitCardsShow",
  async fetch({ store, params }) {
    await store.dispatch('cards/financial-log/fetchItem', params.id)
  },
  computed: {
    ...mapGetters({
      item: 'cards/financial-log/item'
    })
  },
  components: {InfoCol, AppLink, AppBtn, InfoList, InfoItem, BreadcrumbsItem, BreadcrumbsList, AppContainer}
}
</script>

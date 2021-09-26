<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">Главная</breadcrumbs-item>
      <breadcrumbs-item to="/debit-cards">Дебетовые карты</breadcrumbs-item>
      <breadcrumbs-item :to="`/debit-cards/${$route.params.id}`">Карта #{{ $route.params.id }}</breadcrumbs-item>
    </breadcrumbs-list>


    <info-list class="flex gap-8 mb-6">
      <div class="w-2/3">
        <h1 class="text-bold text-2xl mb-4">Информация</h1>
        <div class="flex">
          <div class="w-1/2">
            <info-item name="ФИО">{{ card.fio }}</info-item>
            <info-item name="Номер телефона">{{ card.phone }}</info-item>
            <info-item name="Логин">{{ card.login }}</info-item>
            <info-item name="Пароль от ИБ">{{ card.password_ib }}</info-item>
            <info-item name="Кодовое слово">{{ card.codeword }}</info-item>
            <info-item name="Фото документов">
              <a :href="card.link_photo">{{ card.link_photo }}</a>
            </info-item>
            <info-item name="Комментарий">{{ card.comment }}</info-item>
          </div>
          <div class="w-1/2">
            <info-item name="Карта">{{ card.card }}</info-item>
            <info-item name="Статус">{{ card.statuses.title }}</info-item>
            <info-item name="Банк">{{ card.banks.title }}</info-item>
            <info-item name="Поставщик">{{ card.providers.title }}</info-item>
            <info-item name="Проект">{{ card.projects.title }}</info-item>
            <info-item name="Добавлено">{{ $moment(card.created_at).format('LLL') }}</info-item>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <h1 class="text-bold text-2xl mb-4">Финансовый лог</h1>
        <info-item name="Баланс">Иванов Иван Иванович</info-item>
        <info-item name="Поступления">Иванов Иван Иванович</info-item>
        <info-item name="Снятия">Иванов Иван Иванович</info-item>
        <info-item name="Транзакции">Иванов Иван Иванович</info-item>
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
export default {
  name: "DebitCardsShow",
  async fetch({ store, params }) {
    await store.dispatch('debit-cards/fetchCard', params.id)
  },
  computed: {
    card() {
      return this.$store.getters["debit-cards/card"]
    }
  },
  components: {AppBtn, InfoList, InfoItem, BreadcrumbsItem, BreadcrumbsList, AppContainer}
}
</script>

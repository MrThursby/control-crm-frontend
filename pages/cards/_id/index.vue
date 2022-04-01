<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">Главная</breadcrumbs-item>
      <breadcrumbs-item to="/cards">Дебетовые карты</breadcrumbs-item>
      <breadcrumbs-item :to="`/cards/${$route.params.id}`">Карта #{{ $route.params.id }}</breadcrumbs-item>
    </breadcrumbs-list>


    <info-list class="flex flex-wrap mb-6">
      <div class="w-full lg:w-2/3 mb-4">
        <h1 class="text-bold text-2xl mb-4">Информация</h1>
        <div class="flex flex-wrap">
          <info-col half>
            <info-item name="ФИО">{{ card.fio }}</info-item>
            <info-item name="Номер телефона">{{ card.phone }}</info-item>
            <info-item name="Логин">{{ card.login }}</info-item>
            <info-item name="Пароль от ИБ">{{ card.password_ib }}</info-item>
            <info-item name="Кодовое слово">{{ card.codeword }}</info-item>
            <info-item name="Фото документов">
              <a :href="card.link_photo">{{ card.link_photo }}</a>
            </info-item>
            <info-item name="Комментарий">{{ card.comment }}</info-item>
          </info-col>
          <info-col class="w-1/2">
            <info-item name="Карта">{{ card.card }}</info-item>
            <info-item name="Статус">{{ card.status.title }}</info-item>
            <info-item name="Банк">{{ card.bank.title }}</info-item>
            <info-item name="Поставщик">{{ card.provider.title }}</info-item>
            <info-item name="Проект">{{ card.project.title }}</info-item>
            <info-item name="Добавлено">{{ $moment(card.created_at).format('LLL') }}</info-item>
          </info-col>
        </div>
      </div>
      <info-col v-if="false">
        <h1 class="text-bold text-2xl mb-4">Финансовый лог</h1>
        <info-item name="Баланс">Иванов Иван Иванович</info-item>
        <info-item name="Поступления">Иванов Иван Иванович</info-item>
        <info-item name="Снятия">Иванов Иван Иванович</info-item>
        <info-item name="Транзакции">Иванов Иван Иванович</info-item>
      </info-col>
    </info-list>

    <app-btn @click="$router.push(`/cards/${$route.params.id}/edit`)" class="mr-4">Редактировать</app-btn>
    <app-btn @click="deleteItem" danger>Удалить</app-btn>
  </app-container>
</template>

<script>
import AppContainer from "../../../components/layout/Container/AppContainer";
import BreadcrumbsList from "../../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../../components/ui/Breadcrumbs/BreadcrumbsItem";
import InfoItem from "../../../components/ui/InfoList/InfoItem";
import InfoList from "../../../components/ui/InfoList/InfoList";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import {mapActions, mapGetters} from "vuex";
import InfoCol from "../../../components/ui/InfoList/InfoCol";
export default {
  name: "DebitCardsShow",
  async fetch({ store, params }) {
    await store.dispatch('cards/fetchItem', params.id)
  },
  computed: {
    ...mapGetters({
      card: 'cards/item'
    })
  },
  methods: {
    ...mapActions({
      delete: 'cards/deleteItem'
    }),
    async deleteItem() {
      try {
        await this.delete(this.$route.params.id)
        await this.$router.push('/cards')
      } catch(e) {
        console.log(e);
      }
    }
  },
  components: {InfoCol, AppBtn, InfoList, InfoItem, BreadcrumbsItem, BreadcrumbsList, AppContainer}
}
</script>

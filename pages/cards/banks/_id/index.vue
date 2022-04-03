<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">Главная</breadcrumbs-item>
      <breadcrumbs-item to="/cards">Дебетовые карты</breadcrumbs-item>
      <breadcrumbs-item to="/cards/banks">Банки</breadcrumbs-item>
      <breadcrumbs-item :to="`/cards/banks/${$route.params.id}`">Банк #{{ $route.params.id }}</breadcrumbs-item>
    </breadcrumbs-list>


    <info-list class="mb-6">
      <h1 class="text-bold text-2xl mb-4">Информация</h1>
      <info-col>
        <info-item name="Название">{{ bank.title }}</info-item>
        <info-item name="Название API">{{ bank.api_name }}</info-item>
        <info-item name="Добавлено">{{ $moment(bank.created_at).format('LLL') }}</info-item>
      </info-col>
    </info-list>

    <app-btn v-if="isAbleTo('banks-update')"
             @click="$router.push(`/cards/banks/${$route.params.id}/edit`)"
             class="mr-4">Редактировать</app-btn>
    <app-btn @click="deleteItem" v-if="isAbleTo('banks-delete')" danger>Удалить</app-btn>
  </app-container>
</template>

<script>
import AppContainer from "../../../../components/layout/Container/AppContainer";
import BreadcrumbsList from "../../../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../../../components/ui/Breadcrumbs/BreadcrumbsItem";
import InfoItem from "../../../../components/ui/InfoList/InfoItem";
import InfoList from "../../../../components/ui/InfoList/InfoList";
import AppBtn from "../../../../components/ui/Buttons/AppBtn";
import {mapActions, mapGetters} from "vuex";
import InfoCol from "../../../../components/ui/InfoList/InfoCol";
export default {
  name: "DebitCardsShow",
  async fetch({ store, params }) {
    await store.dispatch('cards/banks/fetchItem', params.id)
  },
  computed: {
    ...mapGetters({
      bank: 'cards/banks/item'
    })
  },
  methods: {
    ...mapActions({
      delete: 'cards/banks/deleteItem'
    }),
    async deleteItem() {
      try {
        await this.delete(this.$route.params.id)
        await this.$router.push('/cards/banks')
      } catch(e) {
        console.log(e);
      }
    }
  },
  components: {InfoCol, AppBtn, InfoList, InfoItem, BreadcrumbsItem, BreadcrumbsList, AppContainer}
}
</script>

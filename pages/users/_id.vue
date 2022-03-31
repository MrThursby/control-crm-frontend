<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Главная
      </breadcrumbs-item>
      <breadcrumbs-item to="/users">
        Пользователи
      </breadcrumbs-item>
      <breadcrumbs-item :to="`/users/${$route.params.id}`">
        Пользователь #{{ $route.params.id }}
      </breadcrumbs-item>
    </breadcrumbs-list>

    <info-list class="mb-6">
      <h1 class="text-bold text-2xl mb-4">Информация</h1>
      <info-col>
        <info-item name="Логин">{{ user.login }}</info-item>
        <info-item name="Email">{{ user.email }}</info-item>
        <info-item v-if="user.roles" name="Роль">{{ user.roles.length !== 0 ? user.roles[0].display_name : 'Нет роли' }}</info-item>
        <info-item name="Добавлен">{{user.created_at ? $moment(user.created_at).format('LLL') : 'Неизвестно' }}</info-item>
      </info-col>
    </info-list>
  </app-container>
</template>

<script>
import BreadcrumbsList from "../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../components/ui/Breadcrumbs/BreadcrumbsItem";
import AppContainer from "../../components/layout/Container/AppContainer";
import InfoList from "../../components/ui/InfoList/InfoList";
import {mapGetters} from "vuex";
import InfoCol from "../../components/ui/InfoList/InfoCol";
import InfoItem from "../../components/ui/InfoList/InfoItem";
export default {
  name: "UsersShow",
  async fetch({ store, params: { id } }) {
    await store.dispatch('users/fetchItem', id)
  },
  computed: {
    ...mapGetters({
      user: 'users/item',
    })
  },
  components: {InfoItem, InfoCol, InfoList, BreadcrumbsItem, BreadcrumbsList, AppContainer}
}
</script>

<style scoped>

</style>

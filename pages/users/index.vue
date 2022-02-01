<template>
  <app-container>
    <page-filters class="flex flex-wrap">
  <!--      <page-filters-item class="mr-auto">
          <search-form @submit="() => { this.page = 1; reFetch() }" v-model="filters.search" />
        </page-filters-item>-->

      <page-filters-item v-if="isAbleTo('regex-banks-create')">
        <app-btn @click="$router.push('/users/create')" class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>Логин</app-table-h-cell>
          <app-table-h-cell>Email</app-table-h-cell>
          <app-table-h-cell>Роль</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body v-if="paginator">
        <app-table-row v-for="item of paginator.data" :key="item.id">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell>
              <app-link :to="`/users/${item.id}`">{{ item.login }}</app-link>
          </app-table-cell>
          <app-table-cell>{{ item.email }}</app-table-cell>
          <app-table-cell>{{ item.roles.length !== 0 ? item.roles[0].display_name : 'Нет роли' }}</app-table-cell>
          <app-table-cell>{{ item.created_at ? $moment(item.created_at).format('LLL') : 'Неизвестно' }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>
  </app-container>
</template>

<script>
import AppContainer from '@/components/layout/Container/AppContainer'
import PageFilters from '@/components/ui/PageFilters/PageFilters'
import PageFiltersItem from '@/components/ui/PageFilters/PageFiltersItem'
import SearchForm from '@/components/ui/Form/SearchForm'
import AppBtn from '@/components/ui/Buttons/AppBtn'
import AppTable from "@/components/Table/AppTable"
import AppTHead from "@/components/Table/AppTHead"
import AppTableHRow from "@/components/Table/AppTableHRow"
import AppTableHCell from "@/components/Table/AppTableHCell"
import AppTableCell from "@/components/Table/AppTableCell"
import AppTableRow from "@/components/Table/AppTableRow"
import AppTBody from "@/components/Table/AppTBody"
import AppLink from "@/components/ui/Links/AppLink"
import {mapGetters} from "vuex";

export default {
  name: "UsersIndex",
  fetch: async function({store}) {
    await store.dispatch('users/fetchPaginator')
  },
  data: () => ({
    filters: {
      search: ''
    },
    page: 1
  }),
  computed: {
    ...mapGetters({
      paginator: "users/paginator"
    })
  },
  components: {
    PageFilters, PageFiltersItem, SearchForm, AppBtn, AppContainer, AppTable, AppTHead, AppTableHRow, AppTableHCell,
    AppTableCell, AppTableRow, AppTBody, AppLink
  }
}
</script>

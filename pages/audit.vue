<template>
  <AppContainer>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Главная
      </breadcrumbs-item>
      <breadcrumbs-item to="/audit">
        Лог
      </breadcrumbs-item>
    </breadcrumbs-list>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>Пользователь</app-table-h-cell>
          <app-table-h-cell>Описание</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row v-for="(item, index) of paginator.data" :key="index">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell nowrap>
            <app-link
              v-if="item.user"
              :to="`/users/${item.user.id}`"
            >{{ item.user.login }}</app-link>
            <span v-else>Пользователь не указан</span>
          </app-table-cell>
          <app-table-cell>
            <div v-for="(jsonItem, index) of JSON.parse(item.description).data">
              {{ index }}: {{ jsonItem }}
            </div>
          </app-table-cell>
          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>

    <app-paginator
      class="mb-4"
      :count="paginator.last_page"
      v-model="page"
      @input="reFetch"
      @perPageUpdated="() => { this.page = 1; reFetch() }"
    />
  </AppContainer>
</template>

<script>
import AppContainer from "../components/layout/Container/AppContainer";
import {mapGetters} from "vuex";
import AppTable from "../components/Table/AppTable";
import AppTHead from "../components/Table/AppTHead";
import AppTableHRow from "../components/Table/AppTableHRow";
import AppTableHCell from "../components/Table/AppTableHCell";
import AppTBody from "../components/Table/AppTBody";
import BreadcrumbsList from "../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../components/ui/Breadcrumbs/BreadcrumbsItem";
import AppTableRow from "../components/Table/AppTableRow";
import AppTableCell from "../components/Table/AppTableCell";
import AppPaginator from "../components/Table/AppPaginator";
import AppLink from "../components/ui/Links/AppLink";
export default {
  name: "Audit",
  fetch: async function({store}) {
    let per_page_options = store.getters["app/per_page_options"]

    await store.dispatch('audit/fetchPaginator', {
      per_page: per_page_options[store.getters["app/per_page"]].id
    })
  },
  data: () => ({
    page: 1
  }),
  methods: {
    async reFetch(page) {
      this.page = page || this.page

      await this.$store.dispatch('audit/fetchPaginator', {
        per_page: this.per_page_options[this.per_page].id,
        page: this.page,
      })
    }
  },
  computed: {
    ...mapGetters({
      paginator: 'audit/paginator',

      per_page: 'app/per_page',
      per_page_options: 'app/per_page_options'
    })
  },
  components: {
    AppLink,
    AppPaginator,
    AppTableCell,
    AppTableRow,
    BreadcrumbsItem, BreadcrumbsList, AppTBody, AppTableHCell, AppTableHRow, AppTHead, AppTable, AppContainer}
}
</script>

<style scoped>

</style>

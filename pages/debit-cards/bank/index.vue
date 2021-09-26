<template>
  <app-container>
    <cards-nav class="mb-8" />

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form @submit="() => { this.page = 1; reFetch() }" v-model="filters.search" />
      </page-filters-item>

      <page-filters-item>
        <app-btn class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>Банк</app-table-h-cell>
          <app-table-h-cell>Название API</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row v-for="(item, index) of banks.data" :key="index">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell>
            <app-link :to="`/debit-cards/bank/${item.id}`">{{ item.title }}</app-link>
          </app-table-cell>
          <app-table-cell nowrap>{{ item.api_name }}</app-table-cell>
          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>

    <app-paginator
      class="mb-4"
      :count="banks.last_page"
      v-model="page"
      @input="reFetch"
      @perPageUpdated="() => { this.page = 1; reFetch() }"
    />
  </app-container>
</template>

<script>
import AppContainer from "../../../components/layout/Container/AppContainer";
import CardsNav from "../../../components/pages/Cards/CardsNav";
import AppTable from "../../../components/Table/AppTable";
import AppPaginator from "../../../components/Table/AppPaginator";
import AppTHead from "../../../components/Table/AppTHead";
import AppTableHRow from "../../../components/Table/AppTableHRow";
import AppTableHCell from "../../../components/Table/AppTableHCell";
import AppTBody from "../../../components/Table/AppTBody";
import AppTableRow from "../../../components/Table/AppTableRow";
import AppTableCell from "../../../components/Table/AppTableCell";
import PageFilters from "../../../components/ui/PageFilters/PageFilters";
import PageFiltersItem from "../../../components/ui/PageFilters/PageFiltersItem";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import SearchForm from "../../../components/ui/Form/SearchForm";
import AppLink from "../../../components/ui/Links/AppLink";
export default {
  name: "CardBank",
  async fetch({ store }) {
    let perPageOptions = store.getters["app/perPageOptions"]
    await store.dispatch('debit-cards/fetchBanks', { per_page: perPageOptions[store.getters["app/perPage"]].id });
  },
  data() {
    return {
      page: 1,
      filters: {
        search: '',
      }
    }
  },
  methods: {
    async reFetch(page) {
      this.page = page || this.page

      let filters = {}

      if (this.filters.search !== '') {
        filters.search = this.filters.search
      }

      await this.$store.dispatch('debit-cards/fetchBanks', {
        per_page: this.perPageOptions[this.perPage].id,
        page: this.page,
        ...filters
      })
    }
  },
  computed: {
    banks() {
      return this.$store.getters["debit-cards/banks"]
    },
    perPage() {
      return this.$store.getters['app/perPage']
    },
    perPageOptions() {
      return this.$store.getters['app/perPageOptions']
    },
  },
  components: {
    AppLink,
    SearchForm,
    AppBtn,
    PageFiltersItem,
    PageFilters,
    AppTableCell,
    AppTableRow,
    AppTBody, AppTableHCell, AppTableHRow, AppTHead, AppPaginator, AppTable, CardsNav, AppContainer}
}
</script>

<style scoped>

</style>

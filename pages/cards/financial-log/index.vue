<template>
  <app-container>
    <cards-nav class="mb-8" />

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form @submit="() => { this.page = 1; reFetch() }" v-model="filters.search" />
      </page-filters-item>


      <page-filters-item>
        <app-datepicker v-model="filters.range" @input="() => { this.page = 1; reFetch() }" />
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>Номер карты</app-table-h-cell>
          <app-table-h-cell>Баланс</app-table-h-cell>
          <app-table-h-cell>Поступления</app-table-h-cell>
          <app-table-h-cell>Снятия</app-table-h-cell>
          <app-table-h-cell>Транзакции</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row v-for="(item, index) of financial_log.data" :key="index">
          <app-table-cell center>
            <app-link :to="`/cards/financial-log/${item.id}`">{{ item.id }}</app-link>
          </app-table-cell>
          <app-table-cell nowrap>{{ item.card.card }}</app-table-cell>
          <app-table-cell>{{ item.sum }}</app-table-cell>
          <app-table-cell>{{ item.bank.title }}</app-table-cell>
          <app-table-cell>{{ item.bank.title }}</app-table-cell>
          <app-table-cell>{{ item.bank.title }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>

    <app-paginator
      class="mb-4"
      :count="financial_log.last_page"
      v-model="page"
      @input="reFetch"
      @perPageUpdated="() => { this.page = 1; reFetch() }"
    />
  </app-container>
</template>

<script>
import { mapGetters } from 'vuex';
import AppContainer from "../../../components/layout/Container/AppContainer";
import CardsNav from "../../../components/pages/Cards/CardsNav";
import AppTable from "../../../components/Table/AppTable";
import AppTHead from "../../../components/Table/AppTHead";
import AppTBody from "../../../components/Table/AppTBody";
import AppTableHRow from "../../../components/Table/AppTableHRow";
import AppTableHCell from "../../../components/Table/AppTableHCell";
import AppTableRow from "../../../components/Table/AppTableRow";
import AppTableCell from "../../../components/Table/AppTableCell";
import AppPaginator from "../../../components/Table/AppPaginator";
import PageFilters from "../../../components/ui/PageFilters/PageFilters";
import PageFiltersItem from "../../../components/ui/PageFilters/PageFiltersItem";
import AppSelect from "../../../components/ui/Form/AppSelect";
import SearchForm from "../../../components/ui/Form/SearchForm";
import AppDatepicker from "../../../components/ui/Form/AppDatepicker";
import AppLink from "../../../components/ui/Links/AppLink";
export default {
  name: "CardFinancialLog",
  async fetch({store}) {
    let per_page_options = store.getters["app/per_page_options"]

    await store.dispatch('cards/financial-log/fetchPaginator', {
      per_page: per_page_options[store.getters["persisted/per_page"]].id
    });
  },
  data: () => ({
    filters: {
      range: [],
      search: '',
    },
    page: 1
  }),
  methods: {
    async reFetch(page) {
      this.page = page || this.page

      let filters = {}

      if (this.filters.range.length !== 0) {
        filters.date = this.filters.range
      }
      if (this.filters.search !== '') {
        filters.search = this.filters.search
      }

      await this.$store.dispatch('cards/financial-log/fetchPaginator', {
        per_page: this.per_page_options[this.per_page].id,
        page: this.page,
        ...filters
      })
    }
  },
  computed: {
    ...mapGetters({
      financial_log: 'cards/financial-log/paginator',

      per_page: 'persisted/per_page',
      per_page_options: 'app/per_page_options'
    })
  },
  components: {
    AppLink,
    AppDatepicker,
    SearchForm,
    AppSelect,
    PageFiltersItem,
    PageFilters,
    AppPaginator,
    AppTableCell,
    AppTableRow, AppTableHCell, AppTableHRow, AppTBody, AppTHead, AppTable, CardsNav, AppContainer}
}
</script>

<style scoped>

</style>

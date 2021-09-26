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
          <app-table-h-cell>Тип</app-table-h-cell>
          <app-table-h-cell>Регулярка</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row v-for="(item, index) of regexes.data" :key="index">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell>{{ item.banks.title }}</app-table-cell>
          <app-table-cell>{{ item.type }}</app-table-cell>
          <app-table-cell>
            <app-link :to="`/debit-cards/regex/${item.id}`">{{ item.regex }}</app-link>
          </app-table-cell>
          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>

    <app-paginator
      class="mb-4"
      :count="regexes.last_page"
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
import AppTHead from "../../../components/Table/AppTHead";
import AppTableHRow from "../../../components/Table/AppTableHRow";
import AppTableHCell from "../../../components/Table/AppTableHCell";
import AppTableCell from "../../../components/Table/AppTableCell";
import AppTableRow from "../../../components/Table/AppTableRow";
import AppTBody from "../../../components/Table/AppTBody";
import PageFilters from "../../../components/ui/PageFilters/PageFilters";
import PageFiltersItem from "../../../components/ui/PageFilters/PageFiltersItem";
import SearchForm from "../../../components/ui/Form/SearchForm";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import AppPaginator from "../../../components/Table/AppPaginator";
import AppLink from "../../../components/ui/Links/AppLink";
export default {
  name: "CardRegex",
  async fetch({ store }) {
    let perPageOptions = store.getters["app/perPageOptions"]
    await store.dispatch('debit-cards/fetchRegexes', { per_page: perPageOptions[store.getters["app/perPage"]].id });
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

      await this.$store.dispatch('debit-cards/fetchRegexes', {
        per_page: this.perPageOptions[this.perPage].id,
        page: this.page,
        ...filters
      })
    }
  },
  computed: {
    regexes() {
      return this.$store.getters["debit-cards/regexes"]
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
    AppPaginator,
    AppBtn,
    SearchForm,
    PageFiltersItem,
    PageFilters,
    AppTBody, AppTableRow, AppTableCell, AppTableHCell, AppTableHRow, AppTHead, AppTable, CardsNav, AppContainer}
}
</script>

<style scoped>

</style>

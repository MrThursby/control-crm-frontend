<template>
  <app-container>
    <cards-nav class="mb-8" />

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form @submit="() => { this.page = 1; reFetch() }" v-model="filters.search" />
      </page-filters-item>

      <page-filters-item>
        <app-btn @click="$router.push('/cards/projects/create')" class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>Проект</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row v-for="(item, index) of projects.data" :key="index">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell>
            <app-link :to="`/cards/projects/${item.id}`">{{ item.title }}</app-link>
          </app-table-cell>
          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>

    <app-paginator
      class="mb-4"
      :count="projects.last_page"
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
import PageFiltersItem from "../../../components/ui/PageFilters/PageFiltersItem";
import SearchForm from "../../../components/ui/Form/SearchForm";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import PageFilters from "../../../components/ui/PageFilters/PageFilters";
import AppPaginator from "../../../components/Table/AppPaginator";
import AppLink from "../../../components/ui/Links/AppLink";
import {mapGetters} from "vuex";
export default {
  name: "CardProject",
  async fetch({ store }) {
    let per_page_options = store.getters["app/per_page_options"]

    await store.dispatch('cards/projects/fetchPaginator', {
      per_page: per_page_options[store.getters["app/per_page"]].id
    });
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

      await this.$store.dispatch('cards/projects/fetchPaginator', {
        per_page: this.per_page_options[this.per_page].id,
        page: this.page,
        ...filters
      })
    }
  },
  computed: {
    ...mapGetters({
      projects: 'cards/projects/paginator',

      per_page: 'app/per_page',
      per_page_options: 'app/per_page_options'
    })
  },
  components: {
    AppLink,
    AppPaginator,
    PageFilters,
    AppBtn,
    SearchForm,
    PageFiltersItem,
    AppTBody, AppTableRow, AppTableCell, AppTableHCell, AppTableHRow, AppTHead, AppTable, CardsNav, AppContainer}
}
</script>

<style scoped>

</style>

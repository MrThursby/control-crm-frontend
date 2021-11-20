<template>
  <app-container>
    <phone-numbers-nav class="mb-8" />

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form @submit="() => { this.page = 1; reFetch() }" v-model="filters.search" />
      </page-filters-item>

      <page-filters-item>
        <app-btn v-if="isAbleTo('phones-create')"
                 @click="$router.push('/phones/create')" class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>Номер</app-table-h-cell>
          <app-table-h-cell>API-ключ</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row v-for="(item, index) of phones.data" :key="index">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell nowrap>
            <app-link :to="`/phones/${item.id}`">{{ item.phone }}</app-link>
          </app-table-cell>
          <app-table-cell>{{ item.api_key_id }}</app-table-cell>
          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>

    <app-paginator
      class="mb-4"
      :count="phones.last_page"
      v-model="page"
      @input="reFetch"
      @perPageUpdated="() => { this.page = 1; reFetch() }"
    />
  </app-container>
</template>

<script>
import AppContainer from "../../components/layout/Container/AppContainer";
import PhoneNumbersNav from "../../components/pages/PhoneNumbers/PhoneNumbersNav";
import PageFilters from "../../components/ui/PageFilters/PageFilters";
import PageFiltersItem from "../../components/ui/PageFilters/PageFiltersItem";
import SearchForm from "../../components/ui/Form/SearchForm";
import AppBtn from "../../components/ui/Buttons/AppBtn";
import AppTable from "../../components/Table/AppTable";
import AppTHead from "../../components/Table/AppTHead";
import AppTableHRow from "../../components/Table/AppTableHRow";
import AppTableHCell from "../../components/Table/AppTableHCell";
import AppTBody from "../../components/Table/AppTBody";
import AppTableRow from "../../components/Table/AppTableRow";
import AppTableCell from "../../components/Table/AppTableCell";
import AppPaginator from "../../components/Table/AppPaginator";
import AppLink from "../../components/ui/Links/AppLink";
import {mapGetters} from "vuex";
export default {
  name: "PhoneNumbersIndex",
  async fetch({ store }) {
    let per_page_options = store.getters["app/per_page_options"]

    await store.dispatch('phones/fetchPaginator', {
      per_page: per_page_options[store.getters["app/per_page"]].id
    });
  },
  data() {
    return {
      page: 1,
      filters: {
        search: ''
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

      await this.$store.dispatch('phones/fetchPaginator', {
        per_page: this.per_page_options[this.per_page].id,
        page: this.page,
        ...filters
      })
    }
  },
  computed: {
    ...mapGetters({
      phones: 'phones/paginator',

      per_page: 'app/per_page',
      per_page_options: 'app/per_page_options'
    })
  },
  components: {
    AppLink,
    AppPaginator,
    AppTableCell,
    AppTableRow,
    AppTBody,
    AppTableHCell,
    AppTableHRow,
    AppTHead, AppTable, AppBtn, SearchForm, PageFiltersItem, PageFilters, PhoneNumbersNav, AppContainer}
}
</script>

<style scoped>

</style>

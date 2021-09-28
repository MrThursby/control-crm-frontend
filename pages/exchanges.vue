<template>
  <app-container>
    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form v-model="filters.search" />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.status"
          :options="[
            { id: 0, title: 'Любой статус' },
          ].concat(statuses.data)"
        />
      </page-filters-item>

      <page-filters-item>
        <app-datepicker v-model="filters.range" />
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
<!--        <app-table-row v-for="(item, index) of providers.data" :key="index">-->
<!--          <app-table-cell center>{{ item.id }}</app-table-cell>-->
<!--          <app-table-cell nowrap>{{ item.card }}</app-table-cell>-->
<!--          <app-table-cell>{{ item.banks.title }}</app-table-cell>-->
<!--          <app-table-cell>{{ item.providers.title }}</app-table-cell>-->
<!--          <app-table-cell>{{ item.projects.title }}</app-table-cell>-->
<!--          <app-table-cell>{{ item.fio }}</app-table-cell>-->
<!--          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>-->
<!--          <app-table-cell center nowrap :style="{ color: statusColors[item.statuses.color] }">{{ item.statuses.title }}</app-table-cell>-->
<!--        </app-table-row>-->
      </app-t-body>
    </app-table>
  </app-container>
</template>

<script>
import AppContainer from "../components/layout/Container/AppContainer";
import PageFilters from "../components/ui/PageFilters/PageFilters";
import PageFiltersItem from "../components/ui/PageFilters/PageFiltersItem";
import SearchForm from "../components/ui/Form/SearchForm";
import AppBtn from "../components/ui/Buttons/AppBtn";
import AppTable from "../components/Table/AppTable";
import AppTHead from "../components/Table/AppTHead";
import AppTableHRow from "../components/Table/AppTableHRow";
import AppTableHCell from "../components/Table/AppTableHCell";
import AppTBody from "../components/Table/AppTBody";
import AppTableRow from "../components/Table/AppTableRow";
import AppTableCell from "../components/Table/AppTableCell";
import AppSelect from "../components/ui/Form/AppSelect";
import AppDatepicker from "../components/ui/Form/AppDatepicker";
import {mapGetters} from "vuex";
export default {
  name: "exchange",
  async fetch({ store }) {
    await store.dispatch('cards/statuses/fetchPaginator')
  },
  data() {
    return {
      filters: {
        search: '',
        status: 0,
      }
    }
  },
  computed: {
    ...mapGetters({
      statuses: 'cards/statuses/paginator'
    })
  },
  components: {
    AppDatepicker,
    AppSelect,
    AppTableCell,
    AppTableRow,
    AppTBody,
    AppTableHCell,
    AppTableHRow, AppTHead, AppTable, AppBtn, SearchForm, PageFiltersItem, PageFilters, AppContainer}
}
</script>

<style scoped>

</style>

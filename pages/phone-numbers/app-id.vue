<template>
  <app-container>
    <phone-numbers-nav class="mb-8" />

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form v-model="filters.search" rounded="md" />
      </page-filters-item>

      <page-filters-item>
        <app-btn class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>App ID</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
<!--        <app-table-row v-for="(item, index) of cards.data" :key="index">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell nowrap>{{ item.card }}</app-table-cell>
          <app-table-cell>{{ item.banks.title }}</app-table-cell>
          <app-table-cell>{{ item.providers.title }}</app-table-cell>
          <app-table-cell>{{ item.projects.title }}</app-table-cell>
          <app-table-cell>{{ item.fio }}</app-table-cell>
          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
          <app-table-cell center nowrap :style="{ color: statusColors[item.statuses.color] }">{{ item.statuses.title }}</app-table-cell>
        </app-table-row>-->
      </app-t-body>
    </app-table>
  </app-container>
</template>

<script>
import AppContainer from "../../components/layout/Container/AppContainer";
import PhoneNumbersNav from "../../components/pages/PhoneNumbers/PhoneNumbersNav";
import PageFiltersItem from "../../components/ui/PageFilters/PageFiltersItem";
import SearchForm from "../../components/ui/Form/SearchForm";
import PageFilters from "../../components/ui/PageFilters/PageFilters";
import AppBtn from "../../components/ui/Buttons/AppBtn";
import AppTable from "../../components/Table/AppTable";
import AppTHead from "../../components/Table/AppTHead";
import AppTableHRow from "../../components/Table/AppTableHRow";
import AppTableHCell from "../../components/Table/AppTableHCell";
import AppTBody from "../../components/Table/AppTBody";
import AppTableRow from "../../components/Table/AppTableRow";
import AppTableCell from "../../components/Table/AppTableCell";
export default {
  name: "index",
  data() {
    return {
      filters: {
        search: ''
      }
    }
  },
  components: {
    AppTableCell,
    AppTableRow,
    AppTBody,
    AppTableHCell,
    AppTableHRow,
    AppTHead, AppTable, AppBtn, PageFilters, SearchForm, PageFiltersItem, PhoneNumbersNav, AppContainer}
}
</script>

<style scoped>

</style>

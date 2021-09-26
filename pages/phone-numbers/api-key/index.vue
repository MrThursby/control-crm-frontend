<template>
  <app-container>
    <phone-numbers-nav class="mb-8" />

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form v-model="filters.search" />
      </page-filters-item>

      <page-filters-item>
        <app-btn class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>API-ключ</app-table-h-cell>
          <app-table-h-cell>App ID</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row v-for="(item, index) of api_keys.data" :key="index">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell nowrap>
            <app-link :to="`/phone-numbers/api-key/${item.id}`">{{ item.api_key }}</app-link>
          </app-table-cell>
          <app-table-cell>{{ item.app_id }}</app-table-cell>
          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>
  </app-container>
</template>

<script>
import AppContainer from "../../../components/layout/Container/AppContainer";
import PhoneNumbersNav from "../../../components/pages/PhoneNumbers/PhoneNumbersNav";
import PageFilters from "../../../components/ui/PageFilters/PageFilters";
import PageFiltersItem from "../../../components/ui/PageFilters/PageFiltersItem";
import SearchForm from "../../../components/ui/Form/SearchForm";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import AppTable from "../../../components/Table/AppTable";
import AppTHead from "../../../components/Table/AppTHead";
import AppTableHRow from "../../../components/Table/AppTableHRow";
import AppTableHCell from "../../../components/Table/AppTableHCell";
import AppTBody from "../../../components/Table/AppTBody";
import AppTableRow from "../../../components/Table/AppTableRow";
import AppTableCell from "../../../components/Table/AppTableCell";
import AppLink from "../../../components/ui/Links/AppLink";
export default {
  name: "index",
  async fetch({ store }) {
    let perPageOptions = store.getters["app/perPageOptions"]
    await store.dispatch('phone-numbers/fetchApiKeys', { per_page: perPageOptions[store.getters["app/perPage"]].id });
  },
  data() {
    return {
      page: 1,
      filters: {
        search: ''
      }
    }
  },
  computed: {
    api_keys() {
      return this.$store.getters["phone-numbers/api_keys"]
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

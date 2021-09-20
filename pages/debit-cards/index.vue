<template>
  <app-container class="mt-12">
    <cards-nav class="mb-8"/>

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form v-model="filters.search" rounded="md" />
      </page-filters-item>

      <page-filters-item>
        <app-select v-model="filters.status" :options="[
          { id: 0, title: 'Любой' },
        ].concat(cards.quantityStatuses)"/>
      </page-filters-item>

      <page-filters-item>
        <app-datepicker v-model="filters.range" />
      </page-filters-item>

      <page-filters-item>
        <app-btn class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <div class="w-full overflow-y-auto">
      <app-table>
        <app-t-head>
          <app-table-h-row>
            <app-table-h-cell>#</app-table-h-cell>
            <app-table-h-cell>Номер карты</app-table-h-cell>
            <app-table-h-cell>Банк</app-table-h-cell>
            <app-table-h-cell>Поставщик</app-table-h-cell>
            <app-table-h-cell>Проекты</app-table-h-cell>
            <app-table-h-cell>ФИО</app-table-h-cell>
            <app-table-h-cell>Добавлено</app-table-h-cell>
            <app-table-h-cell>Статус</app-table-h-cell>
          </app-table-h-row>
        </app-t-head>
        <app-t-body>
          <app-table-row v-for="(item, index) of cards.cards.data" :key="index" class="b">
            <app-table-cell center>{{ item.id }}</app-table-cell>
            <app-table-cell nowrap>{{ item.card }}</app-table-cell>
            <app-table-cell>{{ item.banks.title }}</app-table-cell>
            <app-table-cell>{{ item.providers.title }}</app-table-cell>
            <app-table-cell>{{ item.projects.title }}</app-table-cell>
            <app-table-cell>{{ item.fio }}</app-table-cell>
            <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
            <app-table-cell center nowrap class="text-green-600">{{ item.statuses.title }}</app-table-cell>
          </app-table-row>
        </app-t-body>
      </app-table>
    </div>
  </app-container>
</template>

<script>
import AppContainer from "../../components/layout/Container/AppContainer";
import AppTable from "../../components/Table/AppTable";
import AppTHead from "../../components/Table/AppTHead";
import AppTableRow from "../../components/Table/AppTableRow";
import AppTableCell from "../../components/Table/AppTableCell";
import AppTBody from "../../components/Table/AppTBody";
import AppTableHCell from "../../components/Table/AppTableHCell";
import AppTableHRow from "../../components/Table/AppTableHRow";
import AppBtn from "../../components/ui/Buttons/AppBtn";
import CardsNav from "../../components/pages/Cards/CardsNav";
import PageFilters from "../../components/ui/PageFilters/PageFilters";
import SearchForm from "../../components/ui/Form/SearchForm";
import AppSelect from "../../components/ui/Form/AppSelect";
import AppDatepicker from "../../components/ui/Form/AppDatepicker";
import PageFiltersItem from "../../components/ui/PageFilters/PageFiltersItem";

export default {
  name: "CardIndex",
  async fetch({store}) {
    await store.dispatch('debit-cards/fetchCards');
  },
  data: () => ({
    filters: {
      range: [],
      status: 0,
      search: '',
    }
  }),
  methods: {
    async reFetch() {
      await this.$store.dispatch('debit-cards/fetchCards', {})
    }
  },
  computed: {
    cards() {
      return this.$store.getters['debit-cards/cards']
    }
  },
  components: {
    PageFiltersItem,
    AppDatepicker,
    AppSelect,
    SearchForm,
    PageFilters,
    CardsNav,
    AppBtn,
    AppTableHRow, AppTableHCell, AppTBody, AppTableCell, AppTableRow, AppTHead, AppTable, AppContainer
  }
}
</script>

<style scoped>

</style>

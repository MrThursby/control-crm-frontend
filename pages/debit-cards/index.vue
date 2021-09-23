<template>
  <app-container>
    <cards-nav class="mb-8"/>

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form @submit="() => { this.page = 1; reFetch() }" v-model="filters.search" rounded="md" />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.bank"
          :options="[
            { id: 0, title: 'Любой банк' },
          ].concat(selectsData.banks)"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.provider"
          :options="[
            { id: 0, title: 'Любой поставщик' },
          ].concat(selectsData.providers)"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.project"
          :options="[
            { id: 0, title: 'Любой проект' },
          ].concat(selectsData.projects)"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.status"
          :options="[
            { id: 0, title: 'Любой статус' },
          ].concat(selectsData.statuses)"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-datepicker v-model="filters.range" @input="() => { this.page = 1; reFetch() }" />
      </page-filters-item>

      <page-filters-item>
        <app-btn @click="$router.push('/debit-cards/create')" class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
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
        <app-table-row v-for="(item, index) of cards.data" :key="index">
          <app-table-cell center>{{ item.id }}</app-table-cell>
          <app-table-cell nowrap>{{ item.card }}</app-table-cell>
          <app-table-cell>{{ item.banks.title }}</app-table-cell>
          <app-table-cell>{{ item.providers.title }}</app-table-cell>
          <app-table-cell>{{ item.projects.title }}</app-table-cell>
          <app-table-cell>{{ item.fio }}</app-table-cell>
          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
          <app-table-cell center nowrap :style="{ color: statusColors[item.statuses.color] }">{{ item.statuses.title }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>

    <app-paginator
      class="mb-4"
      :count="cards.last_page"
      v-model="page"
      @input="reFetch"
      @perPageUpdated="() => { this.page = 1; reFetch() }"
    />
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
import AppPaginator from "../../components/Table/AppPaginator";

export default {
  name: "CardIndex",
  async fetch({store}) {
    let perPageOptions = store.getters["app/perPageOptions"]
    await store.dispatch('debit-cards/fetchCards', { per_page: perPageOptions[store.getters["app/perPage"]].id });
  },
  data: () => ({
    filters: {
      range: [],
      status: 0,
      bank: 0,
      project: 0,
      provider: 0,
      search: '',
    },
    statusColors: {
      green: '#10b981',
      orange: '#ff6a00',
      blue: '#2196f3',
      red: '#ff3a3a',
      yellow: '#ffeb3b',
      purple: '#6556ff',
      black: '#777f9e',
      brown: '#bf775c',
    },
    page: 1,
  }),
  methods: {
    async reFetch(page) {
      this.page = page || this.page

      let filters = {}

      if (this.filters.range.length !== 0) {
        filters.date = this.filters.range
      }
      if (this.filters.status !== 0) {
        filters.status_id = this.cards.quantityStatuses[this.filters.status - 1].id
      }
      if (this.filters.bank !== 0) {
        filters.bank_id = this.cards.data.banks[this.filters.bank - 1].id
      }
      if (this.filters.project !== 0) {
        filters.project_id = this.cards.data.projects[this.filters.project - 1].id
      }
      if (this.filters.provider !== 0) {
        filters.provider_id = this.cards.data.providers[this.filters.provider - 1].id
      }
      if (this.filters.search !== '') {
        filters.search = this.filters.search
      }

      await this.$store.dispatch('debit-cards/fetchCards', {
        per_page: this.perPageOptions[this.perPage].id,
        page: this.page,
        ...filters
      })
    },
  },
  computed: {
    cards() {
      return this.$store.getters['debit-cards/cards']
    },
    selectsData() {
      return this.$store.getters['debit-cards/selectsData']
    },
    perPage() {
      return this.$store.getters['app/perPage']
    },
    perPageOptions() {
      return this.$store.getters['app/perPageOptions']
    },
  },
  components: {
    AppPaginator,
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

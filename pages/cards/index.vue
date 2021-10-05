<template>
  <app-container>
    <cards-nav class="mb-8"/>

    <page-filters class="flex flex-wrap">
      <page-filters-item class="mr-auto">
        <search-form @submit="() => { this.page = 1; reFetch() }" v-model="filters.search" />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.bank"
          :options="[
            { id: 0, title: 'Любой банк' },
          ].concat(banks.data)"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.provider"
          :options="[
            { id: 0, title: 'Любой поставщик' },
          ].concat(providers.data)"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.project"
          :options="[
            { id: 0, title: 'Любой проект' },
          ].concat(projects.data)"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-select
          v-model="filters.status"
          :options="[
            { id: 0, title: 'Любой статус' },
          ].concat(statuses.data)"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-datepicker v-model="filters.range" @input="() => { this.page = 1; reFetch() }" />
      </page-filters-item>

      <page-filters-item>
        <app-btn @click="$router.push('/cards/create')" class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>Проект</app-table-h-cell>
          <app-table-h-cell>Банк</app-table-h-cell>
          <app-table-h-cell>Статус</app-table-h-cell>
          <app-table-h-cell>Номер карты</app-table-h-cell>
          <app-table-h-cell>Номер телефона</app-table-h-cell>
          <app-table-h-cell>ФИО</app-table-h-cell>
          <app-table-h-cell>Кодовое слово</app-table-h-cell>
          <app-table-h-cell>Ссылка на фото</app-table-h-cell>
          <app-table-h-cell>Комментарий</app-table-h-cell>
          <app-table-h-cell>Поставщик</app-table-h-cell>
          <app-table-h-cell>Добавлено</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row v-for="(item, index) of cards.data" :key="index">
          <app-table-cell class="pl-4" center>{{ item.id }}</app-table-cell>
          <app-table-cell nowrap>
            <cards-table-select
              @input="value => patchCard(item.id, {
                project_id: projects.data[value].id
              })"
              :first-value="projects.data.findIndex(project => project.id === item.project.id)"
              :options="projects.data"
            />
          </app-table-cell>
          <app-table-cell nowrap>
            <cards-table-select
              @input="value => patchCard(item.id, {
                bank_id: banks.data[value].id
              })"
              :first-value="banks.data.findIndex(bank => bank.id === item.bank.id)"
              :options="banks.data"
            />
          </app-table-cell>
          <app-table-cell nowrap>
            <cards-table-select
              @input="value => patchCard(item.id, {
                status_id: statuses.data[value].id
              })"
              :first-value="statuses.data.findIndex(status => status.id === item.status.id)"
              :options="statuses.data"
            />
          </app-table-cell>
          <app-table-cell nowrap>
            <app-link :to="`/cards/${item.id}`">{{ item.card }}</app-link>
          </app-table-cell>
          <app-table-cell nowrap>+{{ item.phone }}</app-table-cell>
          <app-table-cell>{{ item.fio }}</app-table-cell>
          <app-table-cell>{{ item.codeword }}</app-table-cell>
          <app-table-cell nowrap>{{ item.link_photo }}</app-table-cell>
          <app-table-cell nowrap>{{ item.comment }}</app-table-cell>
          <app-table-cell nowrap>
            <cards-table-select
              @input="value => patchCard(item.id, {
                provider_id: providers.data[value].id
              })"
              :first-value="providers.data.findIndex(provider => provider.id === item.provider.id)"
              :options="providers.data"
            />
          </app-table-cell>
          <app-table-cell nowrap>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
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
import { mapGetters } from 'vuex';
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
import AppLink from "../../components/ui/Links/AppLink";
import CardsTableSelect from "../../components/pages/Cards/CardsTableSelect";

export default {
  name: "CardIndex",
  async fetch({store}) {
    let per_page_options = store.getters["app/per_page_options"]

    await store.dispatch('cards/fetchPaginator', {
      per_page: per_page_options[store.getters["app/per_page"]].id
    });

    await store.dispatch('cards/banks/fetchPaginator');
    await store.dispatch('cards/providers/fetchPaginator');
    await store.dispatch('cards/projects/fetchPaginator');
    await store.dispatch('cards/statuses/fetchPaginator');
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
    page: 1,
  }),
  methods: {
    async patchCard(card_id, data) {
      await this.$axios.$patch(`/api/admin/cards/${card_id}`, data)
    },
    async reFetch(page) {
      this.page = page || this.page

      let filters = {}

      if (this.filters.range.length !== 0) {
        filters.date = this.filters.range
      }
      if (this.filters.status !== 0) {
        filters.status_id = this.statuses.data[this.filters.status - 1].id
      }
      if (this.filters.bank !== 0) {
        filters.bank_id = this.banks.data[this.filters.bank - 1].id
      }
      if (this.filters.project !== 0) {
        filters.project_id = this.projects.data[this.filters.project - 1].id
      }
      if (this.filters.provider !== 0) {
        filters.provider_id = this.providers.data[this.filters.provider - 1].id
      }
      if (this.filters.search !== '') {
        filters.search = this.filters.search
      }

      await this.$store.dispatch('cards/fetchPaginator', {
        per_page: this.per_page_options[this.per_page].id,
        page: this.page,
        ...filters
      })
    },
  },
  computed: {
    ...mapGetters({
      cards: 'cards/paginator',
      banks: 'cards/banks/paginator',
      providers: 'cards/providers/paginator',
      projects: 'cards/projects/paginator',
      statuses: 'cards/statuses/paginator',

      per_page: 'app/per_page',
      per_page_options: 'app/per_page_options',
    })
  },
  components: {
    CardsTableSelect,
    AppLink,
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

<template>
  <app-container class="flex flex-col h-full">
    <cards-nav class="mb-8"/>

    <page-filters class="flex flex-wrap">
      <page-filters-item>
        <app-btn @click="show_settings = true"><fa-icon icon="gear" /></app-btn>
      </page-filters-item>

      <page-filters-item>
        <app-btn @click="reFetch"><fa-icon icon="rotate" /></app-btn>
      </page-filters-item>

      <page-filters-item>
        <search-form @submit="() => { this.page = 1; reFetch() }" v-model="filters.searchQuery" />
      </page-filters-item>

      <page-filters-item class="mr-auto">
        <app-select
          v-model="filters.searchField" 
          :options="searchFields"
          @input="() => { if(filters.searchQuery !== '') {this.page = 1; reFetch()} }"
        />
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
          ].concat( statusesFilterItems )"
          @input="() => { this.page = 1; reFetch() }"
        />
      </page-filters-item>

      <page-filters-item>
        <app-datepicker v-model="filters.range" @input="() => { this.page = 1; reFetch() }" />
      </page-filters-item>

      <page-filters-item v-if="isAbleTo('cards-create')">
        <app-btn @click="$router.push('/cards/create')" class="w-full">Добавить</app-btn>
      </page-filters-item>
    </page-filters>

    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row class="row">
          <app-table-h-cell
            v-for="(field, i) of table_fields.cards"
            v-show="field.show"
            :key="i"
            :center="i === 'id'">
            <template v-if="i === 'id'">
              <input
                @change="selectAll"
                class="hidden checkbox"
                v-model="all_checked"
                name="select-all-items"
                type="checkbox"
              />
              <span class="span-id">{{ field.title }}</span>
            </template>
            <template v-else>
              {{ field.title }}
            </template>
          </app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
        <app-table-row class="row" v-for="(item, index) of cards.data" :key="index">
          <app-table-cell v-show="table_fields.cards.id.show" class="pl-4" center>
            <input v-model="selected_rows"
                   :value="item.id"
                   :name="`item-${index}`"
                   class="hidden checkbox" type="checkbox"
            />
            <span class="span-id">{{ item.id }}</span>
          </app-table-cell>
          <app-table-cell v-show="table_fields.cards.project.show"  nowrap>
            <app-link :to="`/cards/projects/${item.project.id}`">{{ item.project.title }}</app-link>
          </app-table-cell>
          <app-table-cell v-show="table_fields.cards.bank.show"  nowrap>
            <app-link :to="`/cards/banks/${item.bank.id}`">{{ item.bank.title }}</app-link>
          </app-table-cell>
          <app-table-cell v-show="table_fields.cards.status.show"  nowrap>
            <cards-table-select
              v-if="isAbleTo('cards-update')"
              @input="value => patchCard(item.id, {
                status_id: statuses.data[value].id
              })"
              :first-value="statuses.data.findIndex(status => status.id === item.status.id)"
              :options="statuses.data"
            />
            <span v-else>{{ item.status.title }}</span>
          </app-table-cell>
          <app-table-cell v-show="table_fields.cards.card.show"  nowrap>
            <app-link :to="`/cards/${item.id}`">{{ item.card }}</app-link>
          </app-table-cell>
          <app-table-cell v-show="table_fields.cards.phone.show"  nowrap>{{ item.phone }}</app-table-cell>
          <app-table-cell v-show="table_fields.cards.fio.show">{{ item.fio }}</app-table-cell>
          <app-table-cell v-show="table_fields.cards.codeword.show"  nowrap>{{ item.codeword }}</app-table-cell>
          <app-table-cell v-show="table_fields.cards.link_photo.show">{{ item.link_photo }}</app-table-cell>
          <app-table-cell v-show="table_fields.cards.comment.show"  nowrap>{{ item.comment }}</app-table-cell>
          <app-table-cell v-show="table_fields.cards.provider.show" nowrap>
            <app-link :to="`/cards/providers/${item.provider.id}`">{{ item.provider.title }}</app-link>
          </app-table-cell>
          <app-table-cell v-show="table_fields.cards.created_at.show" nowrap>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>
        </app-table-row>
      </app-t-body>
    </app-table>

    <div v-if="selected_rows.length > 0 && isAbleTo('cards-update')" class="bg-black bg-opacity-20 p-4 rounded-md mb-4">
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold">Изменить выбранные</span>
        <app-btn px="4" py="2" @click="show_mass_patch = !show_mass_patch">
          <fa-icon :class="{'transform rotate-180': show_mass_patch}"
                   :icon="['fa', 'chevron-down']"
                   class="text-xs transition duration-150"/>
        </app-btn>
      </div>
      <div v-show="show_mass_patch" class="mt-4 flex flex-col lg:flex-row gap-6">
        <div>
          <div class="flex items-center gap-4 mb-2">
            <div class="w-24">Проект</div>
            <div>
              <cards-table-select
                :first-value="0" up
                v-model="form.project"
                :options="[{title: 'Не изменять'}, ...projects.data]"
              />
            </div>
          </div>
          <div class="flex items-center gap-4 mb-2">
            <div class="w-24">Банк</div>
            <div>
              <cards-table-select
                :first-value="0" up
                v-model="form.bank"
                :options="[{title: 'Не изменять'}, ...banks.data]"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="flex items-center gap-4 mb-2">
            <div class="w-24">Статус</div>
            <div>
              <cards-table-select
                :first-value="0" up
                v-model="form.status"
                :options="[{title: 'Не изменять'}, ...statuses.data]"
              />
            </div>
          </div>
          <div class="flex items-center gap-4 mb-2">
            <div class="w-24">Поставщик</div>
            <div>
              <cards-table-select
                :first-value="0" up
                v-model="form.provider"
                :options="[{title: 'Не изменять'}, ...providers.data]"
              />
            </div>
          </div>
        </div>
        <div>
          <app-btn :disabled="selected_rows.length < 1" @click="show_warning = true">Изменить</app-btn>

          <app-modal
            modal-class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            title="Внимание"
            ok="Да"
            v-show="show_warning"
            @close="show_warning = false"
            @ok="() => { this.show_warning = false; patchCards() }"
          >
            Внимание, вы изменяете сразу {{ selected_rows.length }} записей.
            Действие нельзя будет отменить.
            Хотите продолжить?
          </app-modal>
        </div>
      </div>
    </div>

    <app-table-settings
      table="cards"
      @close="show_settings = false"
      v-show="show_settings"
    />

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
import AppTableSettings from "../../components/Table/AppTableSettings";
import AppModal from "../../components/ui/Modal/AppModal";

export default {
  name: "CardIndex",
  async fetch({store}) {
    let per_page_options = store.getters["app/per_page_options"]

    await store.dispatch('cards/fetchPaginator', {
      per_page: per_page_options[store.getters["persisted/per_page"]].id
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
      searchQuery: '',
      searchField: 0,
    },
    form: {
      project: 0,
      provider: 0,
      status: 0,
      bank: 0,
    },
    searchFields: [
      { id: 0, value: null, title: 'Все поля' },
      { id: 1, value: 'phone', title: 'Номер телефона' },
      { id: 2, value: 'card', title: 'Номер карты' },
      { id: 3, value: 'fio', title: 'ФИО' },
      { id: 4, value: 'id', title: '#' },
    ],
    selected_rows: [],
    show_settings: false,
    show_warning: false,
    all_checked: false,
    show_mass_patch: false,
    page: 1,
  }),
  methods: {
    async patchCard(card_id, data) {
      await this.$axios.$patch(`/api/admin/cards/updates`, { ids: [card_id], ...data })
    },
    async patchCards() {
      let data = {}
      if(this.form.project !== 0)data.project_id = this.projects.data[this.form.project - 1].id
      if(this.form.status !== 0)data.status_id = this.statuses.data[this.form.status - 1].id
      if(this.form.provider !== 0)data.provider_id = this.providers.data[this.form.provider - 1].id
      if(this.form.bank !== 0)data.bank_id = this.banks.data[this.form.bank - 1].id

      console.log(data)

      await this.$axios.$patch(`/api/admin/cards/updates`, {ids: this.selected_rows, ...data})
      await this.reFetch()
      this.selected_rows = []
    },
    async reFetch(page) {
      this.page = page || this.page
      this.all_checked = false

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
      if (this.filters.searchQuery !== '') {
        filters.search = this.filters.search
      }
      if (this.filters.searchQuery !== '' && this.filters.searchField !== null) {
        filters.search = [this.filters.searchQuery, this.searchFields[this.filters.searchField].value ]
      }

      await this.$store.dispatch('cards/fetchPaginator', {
        per_page: this.per_page_options[this.per_page].id,
        page: this.page,
        ...filters
      })
      
      this.$forceUpdate()
    },
    selectAll() {
      if(this.all_checked) {
        this.selected_rows = this.cards.data.map(i => {
          return i.id
        })
      }
      if(!this.all_checked) {
        this.selected_rows = []
      }
    }
  },
  computed: {
    ...mapGetters({
      cards: 'cards/paginator',
      banks: 'cards/banks/paginator',
      providers: 'cards/providers/paginator',
      projects: 'cards/projects/paginator',
      statuses: 'cards/statuses/paginator',

      table_fields: 'persisted/tables',

      per_page: 'persisted/per_page',
      per_page_options: 'app/per_page_options',
    }),

    statusesFilterItems() {
      return this.statuses.data.map(status => {
        return { ...status, title: [status.title, status.cards_count].join(' - ') }
      })
    }
  },
  watch: {
    selected_rows: function (v) {
      this.all_checked = v.length === this.cards.data.length
    }
  },
  components: {
    AppModal,
    AppTableSettings,
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
.row:hover .span-id {
  display: none;
}
.row:hover .checkbox {
  display: inline;
}

.checkbox:checked {
  display: inline;
}
.checkbox:checked ~ .span-id {
  display: none;
}
</style>

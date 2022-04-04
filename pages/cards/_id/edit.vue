<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Главная
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards">
        Дебетовые карты
      </breadcrumbs-item>
      <breadcrumbs-item :to="`/cards/${$route.params.id}`">
        Карта #{{ $route.params.id }}
      </breadcrumbs-item>
      <breadcrumbs-item :to="`/cards/${$route.params.id}/edit`">
        Редактировать
      </breadcrumbs-item>
    </breadcrumbs-list>

    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 lg:w-1/3 px-4">
        <app-form-group
          class="mb-4"
          label="Карта"
          :errors="errors.card"
          :invalid="errors.card.length !== 0 || $v.form.card.$error"
        >
          <app-input
            mask="0000 0000 0000 0000"
            unmask
            v-model="form.card"
            :invalid="errors.card.length !== 0 || $v.form.card.$error"
            @input="$v.form.card.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.card.minLength || !$v.form.card.maxLength">
              Поле должно содержать {{ $v.form.card.$params.minLength.min }} цифр
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.card.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Статус"
          :invalid="errors.status_id.length !== 0"
          :errors="errors.status_id"
        >
          <app-select
            v-model="form.status"
            :options="statuses.data"
            :invalid="errors.status_id.length !== 0"
          />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Банк"
          :invalid="errors.bank_id.length !== 0"
          :errors="errors.bank_id"
        >
          <app-select
            v-model="form.bank"
            :options="banks.data"
            :invalid="errors.bank_id.length !== 0"
          />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Поставщик"
          :invalid="errors.provider_id.length !== 0"
          :errors="errors.provider_id"
        >
          <app-select
            v-model="form.provider"
            :options="providers.data"
            :invalid="errors.provider_id.length !== 0"
          />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Проект"
          :invalid="errors.project_id.length !== 0"
          :errors="errors.project_id"
        >
          <app-select
            v-model="form.project"
            :options="projects.data"
            :invalid="errors.project_id.length !== 0"
          />
        </app-form-group>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 px-4">
        <app-form-group
          class="mb-4"
          label="ФИО"
          :errors="errors.fio"
          :invalid="errors.fio.length !== 0 || $v.form.fio.$error"
        >
          <app-input
            v-model="form.fio"
            :invalid="errors.fio.length !== 0 || $v.form.fio.$error"
            @input="$v.form.fio.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.fio.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Номер"
          :errors="errors.phone"
          :invalid="errors.phone.length !== 0 || $v.form.phone.$error"
        >
          <app-input
            v-model="form.phone"
            :invalid="errors.phone.length !== 0 || $v.form.phone.$error"
            @input="$v.form.phone.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.phone.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Логин"
          :errors="errors.login"
          :invalid="errors.login.length !== 0 || $v.form.login.$error"
        >
          <app-input
            v-model="form.login"
            :invalid="errors.login.length !== 0 || $v.form.login.$error"
            @input="$v.form.login.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.login.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
        </app-form-group>
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 px-4">
        <app-form-group
          class="mb-4"
          label="Пароль от ИБ"
          :errors="errors.password_ib"
          :invalid="errors.password_ib.length !== 0 || $v.form.password_ib.$error"
        >
          <app-input
            v-model="form.password_ib"
            :invalid="errors.password_ib.length !== 0 || $v.form.password_ib.$error"
            @input="$v.form.password_ib.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.password_ib.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Кодовое слово"
          :errors="errors.codeword"
          :invalid="errors.codeword.length !== 0 || $v.form.codeword.$error"
        >
          <app-input
            v-model="form.codeword"
            :invalid="errors.codeword.length !== 0 || $v.form.codeword.$error"
            @input="$v.form.codeword.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.codeword.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Ссылка на фото"
          :errors="errors.link_photo"
          :invalid="errors.link_photo.length !== 0"
        >
          <app-input
            v-model="form.link_photo"
            :invalid="errors.link_photo.length !== 0"
          />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Комментарий"
          :errors="errors.comment"
          :invalid="errors.comment.length !== 0"
        >
          <app-input
            v-model="form.comment"
            :invalid="errors.comment.length !== 0"
          />
        </app-form-group>
      </div>
    </div>
    <div>
      <app-form-group>
        <app-btn @click="submit">Сохранить</app-btn>
      </app-form-group>
    </div>
  </app-container>
</template>

<script>
import AppContainer from "../../../components/layout/Container/AppContainer";
import AppFormGroup from "../../../components/ui/Form/AppFormGroup";
import AppInput from "../../../components/ui/Form/AppInput";
import AppSelect from "../../../components/ui/Form/AppSelect";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import BreadcrumbsList from "../../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../../components/ui/Breadcrumbs/BreadcrumbsItem";
import AppFormGroupError from "../../../components/ui/Form/AppFormGroupError";
import {required, minLength, maxLength, minValue, maxValue, email, numeric, url} from 'vuelidate/lib/validators';
import {mapGetters} from "vuex";

export default {
  name: "CardsCreate",
  async fetch({store, params}) {
    await store.dispatch('cards/fetchItem', params.id)

    await store.dispatch('cards/banks/fetchPaginator')
    await store.dispatch('cards/providers/fetchPaginator')
    await store.dispatch('cards/projects/fetchPaginator')
    await store.dispatch('cards/statuses/fetchPaginator')
  },
  data() {
    return {
      form: {
        card: '',
        status: 0,
        bank: 0,
        provider: 0,
        project: 0,
        fio: '',
        phone: '',
        login: '',
        password_ib: '',
        codeword: '',
        link_photo: '',
        comment: '',
      },
      errors: {
        card: [],
        status_id: [],
        bank_id: [],
        provider_id: [],
        project_id: [],
        fio: [],
        phone: [],
        login: [],
        password_ib: [],
        codeword: [],
        link_photo: [],
        comment: [],
      }
    }
  },
  validations: {
    form: {
      card: {required, minLength: minLength(16), maxLength: maxLength(16)},
      fio: {required},
      phone: {required},
      login: {required},
      password_ib: {required},
      codeword: {required}
    }
  },
  mounted() {
    this.form.card = this.item.card

    let provider = this.providers.data.findIndex(provider => provider.id === this.item.provider_id)
    provider = provider === -1 ? 0 : provider
    this.form.provider = provider

    let bank = this.banks.data.findIndex(bank => bank.id === this.item.bank_id)
    bank = bank === -1 ? 0 : bank
    this.form.bank = bank

    let project = this.projects.data.findIndex(project => project.id === this.item.project_id)
    project = project === -1 ? 0 : project
    this.form.project = project

    let status = this.statuses.data.findIndex(status => status.id === this.item.status_id)
    status = status === -1 ? 0 : status
    this.form.status = status

    this.form.fio = this.item.fio
    this.form.phone = this.item.phone
    this.form.login = this.item.login
    this.form.password_ib = this.item.password_ib
    this.form.codeword = this.item.codeword
    this.form.link_photo = this.item.link_photo
    this.form.comment = this.item.comment
  },
  methods: {
    async submit() {
      this.$v.form.$touch()

      if (this.$v.$invalid) {
        return false;
      }

      let formData = new URLSearchParams()
      formData.append('card', this.form.card)
      formData.append('fio', this.form.fio)
      formData.append('phone', this.form.phone)
      formData.append('login', this.form.login)
      formData.append('password_ib', this.form.password_ib)
      formData.append('codeword', this.form.codeword)
      formData.append('link_photo', this.form.link_photo)
      formData.append('comment', this.form.comment)

      formData.append('status_id', this.statuses.data[this.form.status].id)
      formData.append('bank_id', this.banks.data[this.form.bank].id)
      formData.append('provider_id', this.providers.data[this.form.provider].id)
      formData.append('project_id', this.projects.data[this.form.project].id)

      await this.$axios.$put(`/api/admin/cards/${this.$route.params.id}`, formData, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(r => {
          this.$router.push(`/cards/${r.data.id}`)
        })
        .catch(e => {
          if (e.response.status === 422) {
            this.errors = Object.assign({}, this.errors, e.response.data.errors)
          }
        })
    }
  },
  computed: {
    ...mapGetters({
      item: 'cards/item',
      providers_getter: 'cards/providers/paginator',
      projects_getter: 'cards/projects/paginator',
      statuses_getter: 'cards/statuses/paginator',
      banks_getter: 'cards/banks/paginator',
    }),
    banks() {
      if(this.banks_getter.data.findIndex(bank => bank.id === this.item.bank.id) === -1){
        let banks = JSON.parse(JSON.stringify(this.banks_getter))
        banks.data = [this.item.bank, ...banks.data]
        return banks
      }
      return this.banks_getter
    },
    projects() {
      if(this.projects_getter.data.findIndex(project => project.id === this.item.project.id) === -1){
        let projects = JSON.parse(JSON.stringify(this.projects_getter))
        projects.data = [this.item.project, ...projects.data]
        return projects
      }
      return this.projects_getter
    },
    statuses() {
      if(this.statuses_getter.data.findIndex(status => status.id === this.item.status.id) === -1){
        let statuses = JSON.parse(JSON.stringify(this.statuses_getter))
        statuses.data = [this.item.status, ...statuses.data]
        return statuses
      }
      return this.statuses_getter
    },
    providers() {
      if(this.providers_getter.data.findIndex(provider => provider.id === this.item.provider.id) === -1){
        let providers = JSON.parse(JSON.stringify(this.providers_getter))
        providers.data = [this.item.provider, ...providers.data]
        return providers
      }
      return this.providers_getter
    }
  },
  components: {
    AppFormGroupError,
    BreadcrumbsItem,
    BreadcrumbsList,
    AppBtn,
    AppSelect,
    AppInput,
    AppFormGroup,
    AppContainer
  }
}
</script>
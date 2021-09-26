<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Консоль
      </breadcrumbs-item>
      <breadcrumbs-item to="/debit-cards">
        Дебетовые карты
      </breadcrumbs-item>
      <breadcrumbs-item to="/debit-cards/create">
        Добавление новой карты
      </breadcrumbs-item>
    </breadcrumbs-list>

    <div class="flex gap-16">
      <div class="w-1/3">
        <app-form-group
          class="mb-4"
          label="Карта"
        >
          <app-input
            mask="0000 0000 0000 0000"
            unmask
            v-model="form.card" />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Статус"
        >
          <app-select
            v-model="form.status" :value="0" :options="selectsData.statuses" />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Банк"
        >
          <app-select
            v-model="form.bank" :value="0" :options="selectsData.banks" />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Поставщик"
        >
          <app-select
            v-model="form.provider" :value="0" :options="selectsData.providers" />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Проект"
        >
          <app-select
            v-model="form.project" :value="0" :options="selectsData.projects" />
        </app-form-group>
      </div>
      <div class="w-1/3">
        <app-form-group
          class="mb-4"
          label="ФИО"
        >
          <app-input
            v-model="form.fio"/>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Номер"
        >
          <app-input
            unmask
            :mask="'+{7}(000)000-00-00'"
            v-model="form.phone"/>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Логин"
        >
          <app-input
            v-model="form.login"/>
        </app-form-group>
      </div>
      <div class="w-1/3">
        <app-form-group
          class="mb-4"
          label="Пароль от ИБ"
        >
          <app-input
            v-model="form.password_ib" />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Кодовое слово"
        >
          <app-input
            v-model="form.codeword" />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Ссылка на фото"
        >
          <app-input
            v-model="form.link_photo" />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Комментарий"
        >
          <app-input
            v-model="form.comment" />
        </app-form-group>
      </div>
    </div>
    <div>
      <app-form-group>
        <app-btn @click="submit">Добавить</app-btn>
      </app-form-group>
    </div>
  </app-container>
</template>

<script>
import AppContainer from "../../components/layout/Container/AppContainer";
import AppFormGroup from "../../components/ui/Form/AppFormGroup";
import AppInput from "../../components/ui/Form/AppInput";
import AppSelect from "../../components/ui/Form/AppSelect";
import AppBtn from "../../components/ui/Buttons/AppBtn";
import BreadcrumbsList from "../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../components/ui/Breadcrumbs/BreadcrumbsItem";
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength, minValue, maxValue, email, numeric, url } from 'vuelidate/lib/validators';

export default {
  name: "CardsCreate",
  async fetch({ store }) {
    await store.dispatch('debit-cards/fetchSelectsData')
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
        status: [],
        bank: [],
        provider: [],
        project: [],
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
  validators: {
    form: {
      card: { required, minLength: minLength(16), maxLength: maxLength(16) },
      status: { required, minValue: minValue(1) },
      bank: { required, minValue: minValue(1) },
      provider: { required, minValue: minValue(1) },
      project: { required, minValue: minValue(1) },
      fio: { required },
      phone: { required, numeric, minValue: minValue(70000000000), maxValue: maxValue(79999999999) },
      login: { required, email },
      password_ib: { required },
      codeword: { required },
      link_photo: { required, url },
      comment: { required },
    }
  },
  methods: {
    async submit() {
      let formData = new FormData()
      formData.append('card', this.form.card)
      formData.append('fio', this.form.fio)
      formData.append('phone', this.form.phone)
      formData.append('login', this.form.login)
      formData.append('password_ib', this.form.password_ib)
      formData.append('codeword', this.form.codeword)
      formData.append('link_photo', this.form.link_photo)
      formData.append('comment', this.form.comment)

      formData.append('bank', this.selectsData.banks[this.form.bank].id)
      formData.append('provider', this.selectsData.providers[this.form.provider].id)
      formData.append('project', this.selectsData.projects[this.form.project].id)

      await this.$axios.$post('/api/admin/card', formData)
      .catch(() => {
        //
      })
    }
  },
  computed: {
    selectsData() {
      return this.$store.getters['debit-cards/selectsData']
    },
  },
  components: {BreadcrumbsItem, BreadcrumbsList, AppBtn, AppSelect, AppInput, AppFormGroup, AppContainer}
}
</script>

<style scoped>

</style>

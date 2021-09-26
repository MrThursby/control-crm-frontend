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
          :invalid="errors.status.length !== 0"
          :errors="errors.status"
        >
          <app-select
            v-model="form.status"
            :options="selectsData.statuses"
            :invalid="errors.status.length !== 0"
          />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Банк"
          :invalid="errors.bank.length !== 0"
          :errors="errors.bank"
        >
          <app-select
            v-model="form.bank"
            :options="selectsData.banks"
            :invalid="errors.bank.length !== 0"
          />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Поставщик"
          :invalid="errors.provider.length !== 0"
          :errors="errors.provider"
        >
          <app-select
            v-model="form.provider"
            :options="selectsData.providers"
            :invalid="errors.provider.length !== 0"
          />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Проект"
          :invalid="errors.project.length !== 0"
          :errors="errors.project"
        >
          <app-select
            v-model="form.project"
            :options="selectsData.projects"
            :invalid="errors.project.length !== 0"
          />
        </app-form-group>
      </div>
      <div class="w-1/3">
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
            unmask
            :mask="'+{7}(000)000-00-00'"
            v-model="form.phone"
            :invalid="errors.phone.length !== 0 || $v.form.phone.$error"
            @input="$v.form.phone.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.phone.required">
              Это обязательное поле
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.phone.numeric || !$v.form.phone.minValue || $v.form.phone.maxValue">
              Это поле должно создержать номер телефона
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
      <div class="w-1/3">
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
          :invalid="errors.link_photo.length !== 0 || $v.form.link_photo.$error"
        >
          <app-input
            v-model="form.link_photo"
            :invalid="errors.link_photo.length !== 0 || $v.form.link_photo.$error"
            @input="$v.form.link_photo.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.link_photo.required">
              Это обязательное поле
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.link_photo.url">
              Это поле должно содержать ссылку
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Комментарий"
          :errors="errors.comment"
          :invalid="errors.comment.length !== 0 || $v.form.comment.$error"
        >
          <app-input
            v-model="form.comment"
            :invalid="errors.comment.length !== 0 || $v.form.comment.$error"
            @input="$v.form.comment.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.link_photo.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
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
import {required, minLength, maxLength, minValue, maxValue, email, numeric, url} from 'vuelidate/lib/validators';
import AppFormGroupError from "../../components/ui/Form/AppFormGroupError";

export default {
  name: "CardsCreate",
  async fetch({store}) {
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
  validations: {
    form: {
      card: {required, minLength: minLength(16), maxLength: maxLength(16)},
      fio: {required},
      phone: {required, numeric, minValue: minValue(70000000000), maxValue: maxValue(79999999999)},
      login: {required},
      password_ib: {required},
      codeword: {required},
      link_photo: {required, url},
      comment: {required},
    }
  },
  methods: {
    async submit() {
      this.$v.form.$touch()

      if(this.$v.$invalid) {
        return false;
      }

      let formData = new FormData()
      formData.append('card', this.form.card)
      formData.append('fio', this.form.fio)
      formData.append('phone', this.form.phone)
      formData.append('login', this.form.login)
      formData.append('password_ib', this.form.password_ib)
      formData.append('codeword', this.form.codeword)
      formData.append('link_photo', this.form.link_photo)
      formData.append('comment', this.form.comment)

      formData.append('status_id', this.selectsData.statuses[this.form.status].id)
      formData.append('bank_id', this.selectsData.banks[this.form.bank].id)
      formData.append('provider_id', this.selectsData.providers[this.form.provider].id)
      formData.append('project_id', this.selectsData.projects[this.form.project].id)

      await this.$axios.$post('/api/admin/card', formData)
        .then(r => {
          this.$router.push(`/debit-cards/${r.data.id}`)
        })
        .catch(e => {
          if (e.response.status === 422) {
            this.errors = Object.assign({}, this.errors, e.response.data.errors)
          }
        })
    }
  },
  computed: {
    selectsData() {
      return this.$store.getters['debit-cards/selectsData']
    },
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

<style scoped>

</style>

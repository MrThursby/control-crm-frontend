<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Консоль
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards">
        Дебетовые карты
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards/regex-banks">
        Регулярки
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards/regex-banks/create">
        Добавление новой регулярки
      </breadcrumbs-item>
    </breadcrumbs-list>

    <div class="flex gap-16">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <app-form-group
          class="mb-4"
          label="Регулярка"
          :errors="errors.regex"
          :invalid="errors.regex.length !== 0 || $v.form.regex.$error"
        >
          <app-input
            v-model="form.regex"
            :invalid="errors.regex.length !== 0 || $v.form.regex.$error"
            @input="$v.form.regex.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.regex.required">
              Это обязательное поле
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.regex.minLength || $v.form.regex.maxLength">
              Поле должно содержать от 1 до 255 символов
            </app-form-group-error>
          </template>
        </app-form-group>
        <app-form-group
          class="mb-4"
          label="Тип"
          :errors="errors.type"
          :invalid="errors.type.length !== 0"
        >
          <app-select
            v-model="form.type"
            :options="types "
            :invalid="errors.type.length !== 0"
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
            :options="banks.data"
            :invalid="errors.bank.length !== 0"
          />
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
import AppContainer from "../../../components/layout/Container/AppContainer";
import AppFormGroup from "../../../components/ui/Form/AppFormGroup";
import AppInput from "../../../components/ui/Form/AppInput";
import AppSelect from "../../../components/ui/Form/AppSelect";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import BreadcrumbsList from "../../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../../components/ui/Breadcrumbs/BreadcrumbsItem";
import {required, minLength, maxLength, minValue, maxValue, email, numeric, url} from 'vuelidate/lib/validators';
import AppFormGroupError from "../../../components/ui/Form/AppFormGroupError";
import {mapGetters} from "vuex";

export default {
  name: "CardsCreate",
  async fetch({store}) {
    await store.dispatch('cards/banks/fetchPaginator')
    await store.dispatch('cards/types/fetchList')
  },
  data() {
    return {
      form: {
        regex: '',
        type: "0",
        bank: 0,
      },
      errors: {
        regex: [],
        type: [],
        bank: [],
      }
    }
  },
  validations: {
    form: {
      regex: {required, minLength: minLength(1), maxLength: maxLength(255)},
    }
  },
  methods: {
    async submit() {
      this.$v.form.$touch()

      if(this.$v.$invalid) {
        return false;
      }

      let formData = new FormData()
      formData.append('regex', this.form.regex)
      formData.append('type', this.form.type)
      formData.append('bank_id', this.banks.data[this.form.bank].id)

      await this.$axios.$post('/api/admin/regex-banks', formData)
        .then(r => {
          this.$router.push(`/cards/regex-banks/${r.data.id}`)
        })
        .catch(e => {
          console.log(e)
          if (e.response.status === 422) {
            this.errors = Object.assign({}, this.errors, e.response.data.errors)
          }
        })
    }
  },
  computed: {
    ...mapGetters({
      banks: 'cards/banks/paginator',
      types: 'cards/types/list'
    })
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

<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Главная
      </breadcrumbs-item>
      <breadcrumbs-item to="/phones">
        Номера
      </breadcrumbs-item>
      <breadcrumbs-item to="/phones/api-keys">
        API-ключи
      </breadcrumbs-item>
      <breadcrumbs-item to="/phones/api-keys/create">
        Добавление нового API-ключа
      </breadcrumbs-item>
    </breadcrumbs-list>

    <div class="flex gap-16">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <app-form-group
          class="mb-4"
          label="API-ключ"
          :errors="errors.api_key"
          :invalid="errors.api_key.length !== 0 || $v.form.api_key.$error"
        >
          <app-input
            v-model="form.api_key"
            :invalid="errors.api_key.length !== 0 || $v.form.api_key.$error"
            @input="$v.form.api_key.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.api_key.required">
              Это обязательное поле
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.api_key.minLength || !$v.form.api_key.maxLength">
              Это поле должно содержать от 1 до 255 символов
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Статус"
          :invalid="errors.app_id.length !== 0"
          :errors="errors.app_id"
        >
          <app-select
            v-model="form.app_id"
            :options="apps.data.map(function(i) {
              i.title = i.number
              return i
            })"
            :invalid="errors.app_id.length !== 0"
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
import AppFormGroupError from "../../../components/ui/Form/AppFormGroupError";
import {required, minLength, maxLength, minValue, maxValue, email, numeric, url} from 'vuelidate/lib/validators';
import {mapGetters} from "vuex";

export default {
  name: "CardsCreate",
  async fetch({store}) {
    await store.dispatch('phones/apps/fetchPaginator')
  },
  data() {
    return {
      form: {
        api_key: '',
        app_id: 0,
      },
      errors: {
        api_key: [],
        app_id: [],
      }
    }
  },
  validations: {
    form: {
      api_key: {required, minLength: minLength(1), maxLength: maxLength(255) },
    }
  },
  methods: {
    async submit() {
      this.$v.form.$touch()

      if(this.$v.$invalid) {
        return false;
      }

      let formData = new FormData()
      formData.append('api_key', this.form.api_key)
      formData.append('app_id', this.apps.data[this.form.app_id].id)

      await this.$axios.$post('/api/admin/api-keys', formData)
        .then(r => {
          this.$router.push(`/phones/api-keys/${r.data.id}`)
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
      apps: 'phones/apps/paginator',
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

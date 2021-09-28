<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Главная
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards">
        Дебетовые карты
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards/banks">
        Банки
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards/banks/create">
        Добавление нового банка
      </breadcrumbs-item>
    </breadcrumbs-list>

    <div class="flex gap-16">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <app-form-group
          class="mb-4"
          label="Название банка"
          :errors="errors.title"
          :invalid="errors.title.length !== 0 || $v.form.title.$error"
        >
          <app-input
            v-model="form.title"
            :invalid="errors.title.length !== 0 || $v.form.title.$error"
            @input="$v.form.title.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.title.required">
              Это обязательное поле
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.title.minLength || $v.form.title.maxLength">
              Поле должно содержать от 1 до 255 символов
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Название API"
          :errors="errors.api_name"
          :invalid="errors.api_name.length !== 0 || $v.form.api_name.$error"
        >
          <app-input
            v-model="form.api_name"
            :invalid="errors.api_name.length !== 0 || $v.form.api_name.$error"
            @input="$v.form.api_name.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.api_name.required">
              Это обязательное поле
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.api_name.minLength || $v.form.api_name.maxLength">
              Поле должно содержать от 1 до 255 символов
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
import AppContainer from "../../../components/layout/Container/AppContainer";
import AppFormGroup from "../../../components/ui/Form/AppFormGroup";
import AppInput from "../../../components/ui/Form/AppInput";
import AppSelect from "../../../components/ui/Form/AppSelect";
import AppBtn from "../../../components/ui/Buttons/AppBtn";
import BreadcrumbsList from "../../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../../components/ui/Breadcrumbs/BreadcrumbsItem";
import {required, minLength, maxLength, minValue, maxValue, email, numeric, url} from 'vuelidate/lib/validators';
import AppFormGroupError from "../../../components/ui/Form/AppFormGroupError";

export default {
  name: "CardsCreate",
  data() {
    return {
      form: {
        title: '',
        api_name: '',
      },
      errors: {
        title: [],
        api_name: [],
      }
    }
  },
  validations: {
    form: {
      title: {required, minLength: minLength(1), maxLength: maxLength(255)},
      api_name: {required, minLength: minLength(1), maxLength: maxLength(255)},
    }
  },
  methods: {
    async submit() {
      this.$v.form.$touch()

      if(this.$v.$invalid) {
        return false;
      }

      let formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('api_name', this.form.api_name)

      await this.$axios.$post('/api/admin/banks', formData)
        .then(r => {
          this.$router.push(`/cards/banks/${r.data.id}`)
        })
        .catch(e => {
          console.log(e)
          if (e.response.status === 422) {
            this.errors = Object.assign({}, this.errors, e.response.data.errors)
          }
        })
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

<style scoped>

</style>

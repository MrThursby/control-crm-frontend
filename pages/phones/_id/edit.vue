<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Главная
      </breadcrumbs-item>
      <breadcrumbs-item to="/phones">
        Номера
      </breadcrumbs-item>
      <breadcrumbs-item :to="`/phones/${$route.params.id}`">
        Номер #{{ $route.params.id }}
      </breadcrumbs-item>
      <breadcrumbs-item :to="`/phones/${$route.params.id}/edit`">
        Редактировать
      </breadcrumbs-item>
    </breadcrumbs-list>

    <div class="flex gap-16">
      <div class="w-full md:w-1/2 lg:w-1/3">
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
          label="API-ключ"
          :invalid="errors.api_key.length !== 0"
          :errors="errors.api_key"
        >
          <app-select
            v-model="form.api_key"
            value="0"
            :options="api_keys.data.map(function(i) {
              i.title = i.api_key
              return i
            })"
            :invalid="errors.api_key.length !== 0"
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
    await store.dispatch('phones/fetchItem', params.id)
    await store.dispatch('phones/api-keys/fetchPaginator')
  },
  data() {
    return {
      form: {
        phone: '',
        api_key: 0,
      },
      errors: {
        phone: [],
        api_key: [],
      }
    }
  },
  validations: {
    form: {
      phone: {required, numeric, minValue: minValue(70000000000), maxValue: maxValue(79999999999)},
      api_key: {required},
    }
  },
  mounted() {
    this.form.phone = this.item.phone

    let api_key = this.api_keys.data.findIndex(api_key => api_key.id === this.item.api_key_id)
    api_key = api_key === -1 ? 0 : api_key
    this.form.api_key = api_key
  },
  methods: {
    async submit() {
      this.$v.form.$touch()

      if(this.$v.$invalid) {
        return false;
      }

      let formData = new URLSearchParams()
      formData.append('phone', this.form.phone)
      formData.append('api_key_id', this.api_keys.data[this.form.api_key].id)

      await this.$axios.$put(`/api/admin/phones/${this.$route.params.id}`, formData, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(r => {
          this.$router.push(`/phones/${r.data.id}`)
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
      item: 'phones/item',
      api_keys_getter: 'phones/api-keys/paginator'
    }),
    api_keys() {
      if(this.api_keys_getter.data.findIndex(api_key => api_key.id === this.item.api_key.id) === -1){
        let api_keys = JSON.parse(JSON.stringify(this.api_keys_getter))
        api_keys.data = [this.item.api_key, ...api_keys.data]
        return api_keys
      }
      return this.api_keys_getter
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

<template>
  <app-container>
    <breadcrumbs-list class="mb-8">
      <breadcrumbs-item to="/">
        Консоль
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards">
        Дебетовые карты
      </breadcrumbs-item>
      <breadcrumbs-item to="/cards/projects">
        Проекты
      </breadcrumbs-item>
      <breadcrumbs-item :to="`/cards/projects/${$route.params.id}`">
        Проект #{{ $route.params.id }}
      </breadcrumbs-item>
      <breadcrumbs-item :to="`/cards/projects/${$route.params.id}/edit`">
        Редактировать
      </breadcrumbs-item>
    </breadcrumbs-list>

    <div class="flex gap-16">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <app-form-group
          class="mb-4"
          label="Название проекта"
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
            <app-form-group-error v-if="!$v.form.title.minLength || !$v.form.title.maxLength">
              Поле должно содержать от 1 до 255 символов
            </app-form-group-error>
          </template>
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
import {required, minLength, maxLength} from 'vuelidate/lib/validators';
import AppContainer from "../../../../components/layout/Container/AppContainer";
import AppFormGroup from "../../../../components/ui/Form/AppFormGroup";
import AppInput from "../../../../components/ui/Form/AppInput";
import AppSelect from "../../../../components/ui/Form/AppSelect";
import AppBtn from "../../../../components/ui/Buttons/AppBtn";
import BreadcrumbsList from "../../../../components/ui/Breadcrumbs/BreadcrumbsList";
import BreadcrumbsItem from "../../../../components/ui/Breadcrumbs/BreadcrumbsItem";
import AppFormGroupError from "../../../../components/ui/Form/AppFormGroupError";
import {mapGetters} from "vuex";

export default {
  name: "CardsCreate",
  async fetch({ store, params }) {
    await store.dispatch('cards/projects/fetchItem', params.id)
  },
  data() {
    return {
      form: {
        title: '',
      },
      errors: {
        title: [],
      }
    }
  },
  validations: {
    form: {
      title: {required, minLength: minLength(1), maxLength: maxLength(255)},
    }
  },
  mounted() {
    this.form.title = this.item.title
  },
  computed: {
    ...mapGetters({
      item: 'cards/projects/item'
    })
  },
  methods: {
    async submit() {
      this.$v.form.$touch()

      if(this.$v.$invalid) {
        return false;
      }

      let formData = new URLSearchParams()
      formData.append('title', this.form.title)

      await this.$axios.$put(`/api/admin/projects/${this.$route.params.id}`, formData, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(r => {
          this.$router.push(`/cards/projects/${r.data.id}`)
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

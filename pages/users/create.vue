<template>
  <AppContainer>
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 lg:w-1/3 px-4">
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
            <app-form-group-error v-if="!$v.form.login.maxLength">
              Поле не должно содержать больше {{ $v.form.login.$params.maxLength.max }} символов
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.login.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Email"
          :invalid="errors.email.length !== 0 || $v.form.email.$error"
          :errors="errors.email"
        >
          <app-input
            v-model="form.email"
            :invalid="errors.email.length !== 0 || $v.form.email.$error"
            @input="$v.form.email.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.email.required">
              Это обязательное поле
            </app-form-group-error>
            <app-form-group-error v-if="!$v.form.email.email">
              Поле должно содержать e-mail
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Пароль"
          :invalid="errors.password.length !== 0 || $v.form.password.$error"
          :errors="errors.password"
        >
          <app-input
            v-model="form.password"
            :invalid="errors.password.length !== 0 || $v.form.password.$error"
            @input="$v.form.password.$touch"
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.password.required">
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
            :options="[{ id: 1, title: 'Active' }, { id: 2, title: 'Banned' }]"
            :invalid="errors.status.length !== 0"
          />
        </app-form-group>

        <app-form-group
          class="mb-4"
          label="Роль"
          :invalid="errors.role.length !== 0"
          :errors="errors.role"
        >
          <app-select
            v-model="form.role"
            :options="roles.map(({display_name, ...fields}) => ({title: display_name, ...fields}))"
            :invalid="errors.role.length !== 0"
          />
        </app-form-group>
      </div>
    </div>
    <div>
      <app-form-group>
        <app-btn @click="submit">Добавить</app-btn>
      </app-form-group>
    </div>
  </AppContainer>
</template>

<script>
import AppContainer from "../../components/layout/Container/AppContainer";
import AppFormGroup from "../../components/ui/Form/AppFormGroup";
import AppBtn from "../../components/ui/Buttons/AppBtn";
import AppInput from "../../components/ui/Form/AppInput";
import AppFormGroupError from "../../components/ui/Form/AppFormGroupError";
import AppSelect from "../../components/ui/Form/AppSelect";
import {maxLength, required, email} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";
export default {
  name: "create.vue",
  fetch: async function({ store }) {
    await store.dispatch('users/fetchRoles')
  },
  data: () => ({
    form: {
      login: '',
      email: '',
      password: '',
      status: 0,
      role: 0,
    },
    errors: {
      login: [],
      email: [],
      password: [],
      status: [],
      role: [],
    }
  }),
  validations: {
    form: {
      login: {required, maxLength: maxLength(255)},
      email: {required, email},
      password: {required},
    }
  },
  methods: {
    submit: async function () {
      this.$v.form.$touch()

      let formData = {
        login: this.form.login,
        email: this.form.email,
        password: this.form.password,
        status: this.form.status === 0 ? 'active' : 'banned',
        role: this.roles[this.form.role].id,
      }

      await this.$axios.$post('/api/admin/users-panel', formData)
        .then(r => {
          this.$router.push(`/users/${r.data.id}`)
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
      roles: "users/roles"
    })
  },
  components: {AppSelect, AppFormGroupError, AppInput, AppBtn, AppFormGroup, AppContainer}
}
</script>

<style scoped>

</style>

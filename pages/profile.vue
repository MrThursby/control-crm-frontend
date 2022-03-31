<template>
  <app-container>
    <h1 class="text-3xl mb-4">Редактировать профиль</h1>
    <form class="flex gap-16" @submit.prevent="submit">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <app-form-group
          class="mb-4"
          label="Логин"
          :invalid="errors.login.length !== 0 || $v.form.login.$error"
          :errors="errors.login"
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
            <app-form-group-error v-if="!$v.form.login.maxLength">
              Максимальная длина поля - 255 символов
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
          label="Старый пароль" 
          :invalid="errors.old_password.length !== 0 || $v.form.old_password.$error" 
          :errors="errors.old_password"
        >
          <app-input 
            v-model="form.old_password" 
            :invalid="errors.old_password.length !== 0 || $v.form.old_password.$error"
            @input="$v.form.old_password.$touch" 
            type="password" 
          />
          <template #errors>
            <app-form-group-error v-if="!$v.form.old_password.required">
              Это обязательное поле
            </app-form-group-error>
          </template>
        </app-form-group>

        <app-form-group class="mb-4" label="Новый пароль">
          <app-input v-model="form.password" type="password" />
          <p class="mt-2 text-white text-opacity-60">Оставьте пустым, если не собираетесь менять</p>
        </app-form-group>

        <app-form-group class="mb-4" label="Повторите новый пароль" :invalid="errors.password_confirmation.length !== 0 || $v.form.password_confirmation.$error">
          <app-input 
            v-model="form.password_confirmation" 
            type="password" 
            @input="$v.form.password_confirmation.$touch"
            :invalid="errors.password_confirmation.length !== 0 || $v.form.password_confirmation.$error"
          />
          <template #description>Оставьте пустым, если не собираетесь менять</template>
          <template #errors>
            <app-form-group-error v-if="!$v.form.password_confirmation.sameAs">
              Пароли не совпадают
            </app-form-group-error>
          </template>
        </app-form-group>

        <p v-if="success" class="mb-6 text-green-500">Изменения сохранены</p>
        
        <app-btn>Сохранить</app-btn>
      </div>
    </form>
  </app-container>
</template>

<script>
import AppContainer from "../components/layout/Container/AppContainer";
import AppFormGroup from "../components/ui/Form/AppFormGroup";
import AppFormGroupError from "../components/ui/Form/AppFormGroupError";
import AppInput from "../components/ui/Form/AppInput";
import {maxLength, required, email, sameAs} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import AppBtn from "../components/ui/Buttons/AppBtn.vue";
export default {
  name: "profile",
  async fetch() {
    await this.$auth.fetchUser()
  },
  data: () => ({
    success: null,
    form: {
      login: '',
      email: '',
      old_password: '',
      password: '',
      password_confirmation: '',
    },
    errors: {
      email: [],
      login: [],
      old_password: [],
      password: [],
      password_confirmation: [],
    }
  }),
  validations: {
    form: {
      login: {required, maxLength: maxLength(255)},
      email: {required, email},
      old_password: {required},
      password_confirmation: {sameAs: sameAs('password')},
    }
  },
  methods: {
    async submit() {
      this.$v.form.$touch()

      if (this.$v.$invalid) {
        return false;
      }

      try {
        let formData = {}

        Object.entries(this.form).map(([key, value]) => {
          if(value !== '') formData[key] = value
        })

        await this.$axios.$put('/api/profile', formData)
        await this.$auth.fetchUser()

        this.success = true

        Object.keys(this.errors).map(key => this.errors[key] = [])
        
        this.form.password = ''
        this.form.password_confirmation = ''
      } catch (e) {
        console.log(e) 
        if (e.response.status === 422) {
          this.errors = Object.assign({}, this.errors, e.response.data.errors)
        }
      }
    }
  },
  mounted() {
    ({
      email: this.form.email,
      login: this.form.login,
    } = this.$auth.user)
  },
  watch: {
    async success() {
      await setTimeout(() => this.success = null, 5000)
    }
  },
  components: { AppInput, AppFormGroup, AppFormGroupError, AppContainer, AppBtn }
}
</script>
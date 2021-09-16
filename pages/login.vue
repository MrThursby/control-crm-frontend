<template>
  <div class="flex items-center justify-center h-screen">
    <form @submit.prevent="submit" class="mx-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <h1 class="text-3xl text-center mb-6">Вход</h1>
      <app-form-group class="mb-4" label="Логин">
        <app-input
          v-model="form.username"
          @input="error = null"
          placeholder="Логин"
        />
      </app-form-group>
      <app-form-group
        class="mb-4"
        :errors="this.error ? [this.error] : []"
        label="Пароль"
      >
        <app-input
          v-model="form.password"
          @input="error = null"
          type="password"
          placeholder="Пароль"
        />
      </app-form-group>
      <app-form-group class="sm:text-center">
        <app-btn>Войти</app-btn>
      </app-form-group>
    </form>
  </div>
</template>

<script>
import AppInput from "../components/ui/Form/AppInput";
import AppFormGroup from "../components/ui/Form/AppFormGroup";
import AppBtn from "../components/ui/Buttons/AppBtn";

export default {
  name: "Login",
  auth: "guest",
  layout: "sign",
  data() {
    return {
      error: '',
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async submit() {
      await this.$auth.loginWith('primary', {
        data: {
          ...this.form,
          client_id: process.env.API_CLIENT_ID,
          client_secret: process.env.API_CLIENT_SECRET,
          grant_type: 'password'
        }
      })
      .catch(e => {
        if (e.response.data.error === 'invalid_grant'){
          this.error = 'Неверный логин или пароль'
        }
        else {
          this.error = 'Неизвестная ошибка, попробуйте позже'
        }
      })
    }
  },
  components: {AppBtn, AppFormGroup, AppInput}
}
</script>

<style scoped>

</style>

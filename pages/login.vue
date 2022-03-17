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
      <app-form-group class="mb-4 flex justify-center">
        <recaptcha data-theme="dark" />
      </app-form-group>
      <p v-if="error" class="text-red-500 text-center mb-4">{{ error }}</p>
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
      recaptcha_id: null,
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async submit() {
      try {
        const token = await this.$recaptcha.getResponse()

        await this.$auth.loginWith('local', {
          data: {
            login: this.form.username,
            password: this.form.password,
            device_name: navigator.userAgent,
            'g-recaptcha-response': token
          }
        })

        await this.$recaptcha.reset()
      } catch (e) {
        console.log(e)

        if (e.response && (e.response.status === 404 || e.response.status === 403)) {
          this.error = 'Неверный логин или пароль'
        }
      }
    },
  },
  components: {AppBtn, AppFormGroup, AppInput}
}
</script>

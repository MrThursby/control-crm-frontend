<template>
  <app-container>
    <h1 class="text-3xl mb-4">Редактировать профиль</h1>
    <form class="flex gap-16">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <app-form-group class="mb-8" label="ФИО">
          <app-input />
        </app-form-group>


        <h1 class="text-2xl mb-4">Новый пароль</h1>
        <app-form-group class="mb-4" label="Старый пароль">
          <app-input />
        </app-form-group>
        <app-form-group class="mb-4" label="Новый пароль">
          <app-input />
        </app-form-group>
        <app-form-group class="mb-4" label="Повторите пароль">
          <app-input />
        </app-form-group>
      </div>
    </form>
  </app-container>
</template>

<script>
import AppContainer from "../components/layout/Container/AppContainer";
import AppFormGroup from "../components/ui/Form/AppFormGroup";
import AppInput from "../components/ui/Form/AppInput";
export default {
  name: "profile",
  components: {AppInput, AppFormGroup, AppContainer}
}
</script>

<style scoped>

</style>

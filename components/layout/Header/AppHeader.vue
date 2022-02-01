<template>
  <header class="border-b border-black border-opacity-20 z-10">
    <app-container class="items-center h-16 hidden md:flex">
<!--      <search-form
        @submit="submitSearchForm"
        v-model="search"
        rounded-full
      />-->
      <div class="w-full flex justify-end gap-4">
<!--        <app-link to="/profile">Профиль</app-link>-->
        <app-link tag="button" @click="handleLogout">Выйти</app-link>
      </div>
    </app-container>
    <div class="flex md:hidden h-12 items-center px-4 justify-between">
      <div>
        <button
          v-show="!mobileSearchOpened"
          @click="mobileSearchOpened = true"
        >
          <fa-icon class="text-xl" icon="search" />
        </button>
        <search-form
          @submit="submitSearchForm"
          @blur="mobileSearchOpened = false"
          v-focus="mobileSearchOpened"
          ref="mobileSearchInput"
          v-model="search"
          v-show="mobileSearchOpened"
          md
        />
      </div>
      <div>
        <button class="text-2xl" @click="mobileMenuOpened = !mobileMenuOpened">
          <fa-icon v-if="!mobileMenuOpened" icon="bars" />
          <fa-icon v-if="mobileMenuOpened" icon="times" />
        </button>
      </div>
      <div v-show="mobileMenuOpened" class="flex flex-col absolute py-6 top-12 bottom-0 left-0 right-0 mt-px bg-dark px-4">
        <h1 class="text-3xl mb-4">Menu</h1>
        <nuxt-link
          class="flex items-center px-4 -mx-4 h-10 mb-2 focus:bg-black focus:bg-opacity-10"
          active-class="bg-black bg-opacity-20 focus:bg-opacity-20"
          v-for="(item, index) of menu"
          :exact="item.exact"
          :key="index"
          :to="item.to"
        >{{ item.title }}</nuxt-link>
        <hr class="border-black border-opacity-20 -mx-4 mb-2">
        <app-btn
          class="text-danger flex items-center px-4 -mx-4 h-10 mb-2 focus:bg-black focus:bg-opacity-10"
          @click="handleLogout">Выйти</app-btn>
<!--        <app-btn>Профиль</app-btn>-->
      </div>
    </div>
  </header>
</template>

<script>
import AppContainer from "../Container/AppContainer";
import AppInput from "../../ui/Form/AppInput";
import AppLink from "../../ui/Links/AppLink";
import focus from 'vue-focus'
import SearchForm from "../../ui/Form/SearchForm";
import AppBtn from "../../ui/Buttons/AppBtn";
import AppSelect from "../../ui/Form/AppSelect";
export default {
  name: "AppHeader",
  data() { return {
    search: '',
    mobileSearchOpened: false,
    mobileMenuOpened: false,
  }},
  methods: {
    submitSearchForm() {
      this.mobileSearchOpened = false
    },
    async handleLogout() {
      await this.$auth.logout()
    },
  },
  computed: {
    menu() {
      return this.$store.getters['app/menu']
    },
  },
  directives: {focus},
  components: {AppSelect, AppBtn, SearchForm, AppLink, AppInput, AppContainer}
}
</script>

<style scoped>

</style>

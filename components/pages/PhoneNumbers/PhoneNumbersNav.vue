<template>
  <page-nav class="flex-wrap w-full">
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/phone-numbers" exact>Номера</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/phone-numbers/api-key">API-ключи</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/phone-numbers/app-id">App ID</page-nav-item>
  </page-nav>
</template>

<script>
import AppBtn from "../../ui/Buttons/AppBtn";
import PageNavItem from "../../ui/PageNav/PageNavItem";
import PageNav from "../../ui/PageNav/PageNav";
export default {
  name: "PhoneNumbersNav",
  components: {PageNav, PageNavItem, AppBtn}
}
</script>

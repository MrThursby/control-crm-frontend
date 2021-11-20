<template>
  <page-nav>
    <page-nav-item v-if="isAbleTo('phones-read')"
                   to="/phones" exact>Номера</page-nav-item>
    <page-nav-item v-if="isAbleTo('api-keys-read')"
                   to="/phones/api-keys">API-ключи</page-nav-item>
    <page-nav-item v-if="isAbleTo('apps-read')"
                   to="/phones/apps">App ID</page-nav-item>
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

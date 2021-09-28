<template>
  <page-nav class="flex-wrap w-full">
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/cards" exact>Дебетовые карты</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/cards/financial-log">Финансовый лог</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/cards/banks">Банки</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/cards/providers">Поставщики</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/cards/projects">Проекты</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/cards/regex-banks">Регулярки</page-nav-item>
  </page-nav>
</template>

<script>
import AppBtn from "../../ui/Buttons/AppBtn";
import PageNavItem from "../../ui/PageNav/PageNavItem";
import PageNav from "../../ui/PageNav/PageNav";
export default {
  name: "CardsNav",
  components: {PageNav, PageNavItem, AppBtn}
}
</script>

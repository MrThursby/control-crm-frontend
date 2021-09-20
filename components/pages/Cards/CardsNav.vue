<template>
  <page-nav class="flex-wrap w-full">
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/debit-cards" exact>Дебетовые карты</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/debit-cards/financial-log">Финансовый лог</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/debit-cards/bank">Банки</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/debit-cards/provider">Поставщики</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/debit-cards/project">Проекты</page-nav-item>
    <page-nav-item class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/debit-cards/regex">Регулярки</page-nav-item>
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

<template>
  <page-nav>
    <page-nav-item
      v-if="isAbleTo('cards-read')"
      to="/cards"
      exact
    >Дебетовые карты</page-nav-item>
<!--    <page-nav-item-->
<!--      v-if="isAbleTo('financial-log-read')"-->
<!--      to="/cards/financial-log"-->
<!--    >Финансовый лог</page-nav-item>-->
    <page-nav-item
      v-if="isAbleTo('banks-read')"
      to="/cards/banks"
    >Банки</page-nav-item>
    <page-nav-item
      v-if="isAbleTo('providers-read')"
      to="/cards/providers"
    >Поставщики</page-nav-item>
    <page-nav-item
      v-if="isAbleTo('projects-read')"
      to="/cards/projects"
    >Проекты</page-nav-item>
    <page-nav-item
      v-if="isAbleTo('regex-banks-read')"
      to="/cards/regex-banks"
    >Регулярки</page-nav-item>
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

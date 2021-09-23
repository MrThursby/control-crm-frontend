<template>
  <app-container>
    <page-nav class="flex-wrap w-full">
      <app-datepicker class="w-1/2 md:w-1/3 lg:w-auto px-2 mb-4" to="/debit-cards/provider">Выбрать</app-datepicker>
    </page-nav>



    <div class="flex items-center justify-between">
      <h2 class="text-3xl">Недавние транзакции</h2>
      <app-btn>Смотреть все</app-btn>
    </div>
    <app-table class="mb-4">
      <app-t-head>
        <app-table-h-row>
          <app-table-h-cell center>#</app-table-h-cell>
          <app-table-h-cell>Ушло</app-table-h-cell>
          <app-table-h-cell>Пришло</app-table-h-cell>
          <app-table-h-cell>Кошелёк</app-table-h-cell>
          <app-table-h-cell>Хэш</app-table-h-cell>
          <app-table-h-cell>Создано</app-table-h-cell>
        </app-table-h-row>
      </app-t-head>
      <app-t-body>
<!--        <app-table-row v-for="(item, index) of providers.data" :key="index">-->
<!--          <app-table-cell center>{{ item.id }}</app-table-cell>-->
<!--          <app-table-cell nowrap>{{ item.card }}</app-table-cell>-->
<!--          <app-table-cell>{{ item.banks.title }}</app-table-cell>-->
<!--          <app-table-cell>{{ item.providers.title }}</app-table-cell>-->
<!--          <app-table-cell>{{ item.projects.title }}</app-table-cell>-->
<!--          <app-table-cell>{{ item.fio }}</app-table-cell>-->
<!--          <app-table-cell>{{ $moment(item.created_at).format('LLL') }}</app-table-cell>-->
<!--          <app-table-cell center nowrap :style="{ color: statusColors[item.statuses.color] }">{{ item.statuses.title }}</app-table-cell>-->
<!--        </app-table-row>-->
      </app-t-body>
    </app-table>
  </app-container>
</template>

<script>
import AppContainer from "../components/layout/Container/AppContainer";
import AppBtn from "../components/ui/Buttons/AppBtn";
import PageNav from "../components/ui/PageNav/PageNav";
import AppTable from "../components/Table/AppTable";
import AppTHead from "../components/Table/AppTHead";
import AppTableHRow from "../components/Table/AppTableHRow";
import AppTableHCell from "../components/Table/AppTableHCell";
import AppTBody from "../components/Table/AppTBody";
import PageNavItem from "../components/ui/PageNav/PageNavItem";
import AppDatepicker from "../components/ui/Form/AppDatepicker";
import AppTableRow from "../components/Table/AppTableRow";
import AppTableCell from "../components/Table/AppTableCell";
export default {

  components: {
    AppTableCell,
    AppTableRow,
    AppDatepicker,
    PageNavItem, AppTBody, AppTableHCell, AppTableHRow, AppTHead, AppTable, PageNav, AppBtn, AppContainer}
}
</script>

<template>
  <app-container class="mt-4">
    <div class="w-full overflow-y-auto">
      <app-table>
        <app-t-head>
          <app-table-h-row>
            <app-table-h-cell>#</app-table-h-cell>
            <app-table-h-cell>Номер карты</app-table-h-cell>
            <app-table-h-cell>Баланс</app-table-h-cell>
            <app-table-h-cell>Банк</app-table-h-cell>
            <app-table-h-cell>Поставщик</app-table-h-cell>
            <app-table-h-cell>Проекты</app-table-h-cell>
            <app-table-h-cell>ФИО</app-table-h-cell>
            <app-table-h-cell>Добавлено</app-table-h-cell>
            <app-table-h-cell>Статус</app-table-h-cell>
          </app-table-h-row>
        </app-t-head>
        <app-t-body>
          <app-table-row v-for="i of 40" :key="i" class="b">
            <app-table-cell center>1</app-table-cell>
            <app-table-cell nowrap>0000 0000 0000 0000</app-table-cell>
            <app-table-cell>7 948.60р</app-table-cell>
            <app-table-cell>OTP_Bank</app-table-cell>
            <app-table-cell>Название поставщика</app-table-cell>
            <app-table-cell>Назв. проекта</app-table-cell>
            <app-table-cell>Ивонов Иван Иванович</app-table-cell>
            <app-table-cell>18 сентября, 2020 23:48:33</app-table-cell>
            <app-table-cell center nowrap class="text-green-600">В работе</app-table-cell>
          </app-table-row>
        </app-t-body>
      </app-table>
    </div>
  </app-container>
</template>

<script>
import AppContainer from "../../components/layout/Container/AppContainer";
import AppTable from "../../components/Table/AppTable";
import AppTHead from "../../components/Table/AppTHead";
import AppTableRow from "../../components/Table/AppTableRow";
import AppTableCell from "../../components/Table/AppTableCell";
import AppTBody from "../../components/Table/AppTBody";
import AppTableHCell from "../../components/Table/AppTableHCell";
import AppTableHRow from "../../components/Table/AppTableHRow";

export default {
  name: "index",
  components: {AppTableHRow, AppTableHCell, AppTBody, AppTableCell, AppTableRow, AppTHead, AppTable, AppContainer}
}
</script>

<style scoped>

</style>

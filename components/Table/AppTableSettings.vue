<template>
  <app-modal
    modal-class="w-1/3"
    title="Настройка таблицы"
    close="Закрыть"
    @close="$emit('close')"
  >
    <label class="block p-2" v-for="(field, i) of fields[table]" :key="i">
      <input :checked="field.show"
             @change="setFieldShow({show: !field.show, table: table, field: i})"
             type="checkbox">
      <span>{{ field.title }}</span>
    </label>
  </app-modal>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import AppModal from "../ui/Modal/AppModal";

export default {
  name: "AppTableSettings",
  components: {AppModal},
  computed: {
    ...mapGetters({
      fields: 'app/tables'
    })
  },
  methods: {
    ...mapMutations({
      setFieldShow: 'app/setTableFieldShow'
    })
  },
  props: {
    table: { type: String, required: true }
  }
}
</script>

<style scoped>

</style>

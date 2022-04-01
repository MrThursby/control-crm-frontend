<template>
  <app-modal
    modal-class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
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
      fields: 'persisted/tables'
    })
  },
  methods: {
    ...mapMutations({
      setFieldShow: 'persisted/setTableFieldShow'
    })
  },
  props: {
    table: { type: String, required: true }
  }
}
</script>

<style scoped>

</style>

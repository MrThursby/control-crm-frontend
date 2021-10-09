<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center"
  >
    <div @click="$emit('close')"
         class="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50"></div>

    <div class="bg-dark rounded-md z-30">
      <div class="border-b p-4 border-black border-opacity-20">
        Настройка таблицы
      </div>
      <div class="p-4">
        <label class="block p-2" v-for="(field, i) of fields[table]" :key="i">
          <input :checked="field.show"
                 @change="setFieldShow({show: !field.show, table: table, field: i})"
                 type="checkbox">
          <span>{{ field.title }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "AppTableSettings",
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

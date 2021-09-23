<template>
  <div class="flex justify-center flex-wrap gap-4">
    <app-btn @click="() => changePage(value - 1)" :disabled="value <= 1">Предыдущая</app-btn>
    <div class="flex gap-4">
      <app-select up :value="perPage" @input="changePerPage" :options="perPageOptions"></app-select>
      <app-select up :value="value - 1" @input="changePage($event + 1)" :options="pages"></app-select>
    </div>
    <app-btn @click="() => changePage(value + 1)" :disabled="value >= pages.length">Следующая</app-btn>
  </div>
</template>

<script>
import AppSelect from "../ui/Form/AppSelect";
import AppBtn from "../ui/Buttons/AppBtn";
export default {
  name: "AppPaginator",
  components: {AppBtn, AppSelect},
  computed: {
    pages() {
      let options = []
      for(let i = 1; i <= this.count; i++){
        options.push({
          id: i, title: `${i} страница`
        })
      }
      return options
    },
    perPage() {
      return this.$store.getters['app/perPage']
    },
    perPageOptions() {
      return this.$store.getters['app/perPageOptions']
    },
  },
  methods: {
    changePage(value) {
      this.$emit('input', value)
    },
    changePerPage(value) {
      this.$store.dispatch('app/changePerPage', value)
      this.$emit('perPageUpdated', value)
    }
  },
  props: {
    count: { type: Number, required: true },
    value: { type: Number, required: true },
  }
}
</script>

<style scoped>

</style>

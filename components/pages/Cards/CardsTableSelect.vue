<template>
  <app-select
    @input="onInput"
    :value="value"
    :options="options"
  />
</template>

<script>
import AppSelect from "../../ui/Form/AppSelect";
export default {
  name: "CardsTableSelect",
  data() {
    return {
      value: 0
    }
  },
  mounted() {
    this.value = this.firstValue
  },
  methods: {
    onInput(e){
      this.value = e
      this.$emit('input', e)
    }
  },
  props: {
    options: { type: Array, required: true },
    firstValue: { type: Number, default: 0}
  },
  components: {AppSelect}
}
</script>

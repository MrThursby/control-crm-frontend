<template>
  <form @submit.prevent="$emit('submit')" class="relative">
    <fa-icon
      class="absolute h-full w-4 mx-4 text-sm transition duration-150"
      :class="{
              'text-light': focused,
              'text-primary': !focused,
            }"
      icon="magnifying-glass"
    />
    <app-input
      @input="$emit('input', value)"
      v-model="value"
      v-focus="focused"
      :h="md ? 8 : 12"
      @focus="() => { this.focused = true; this.$emit('focus') }"
      @blur="() => { this.focused = false; this.$emit('blur') }"
      class="pl-10"
      :class="{'rounded-full': roundedFull}"
    />
  </form>
</template>

<script>
import focus from 'vue-focus';
import AppInput from "./AppInput";

export default {
  name: "SearchForm",
  data() {
    return {
      focused: false,
      value: ''
    }
  },
  mounted() {
    this.$on('focus', () => {
      this.focused = true
    })
  },
  props: {
    md: {type: Boolean, default: false},
    roundedFull: {type: Boolean, default: false },
  },
  directives: {focus},
  components: {AppInput}
}
</script>

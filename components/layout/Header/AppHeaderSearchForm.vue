<template>
  <form @submit.prevent="$emit('submit')">
    <div class="relative">
      <fa-icon
        class="absolute h-full mx-4 text-sm pt-px transition duration-150"
        :class="{
              'text-light': focused,
              'text-primary': !focused,
            }"
        icon="search"
      />
      <app-input
        @input="$emit('input')"
        v-focus="focused"
        :h="md ? 8 : 12"
        @focus="() => { this.focused = true; this.$emit('focus') }"
        @blur="() => { this.focused = false; this.$emit('blur') }"
        class="rounded-full pl-10"
      />
    </div>
  </form>
</template>

<script>
import focus from 'vue-focus';
import AppInput from "../../ui/Form/AppInput";
export default {
  name: "AppHeaderSearchForm",
  data() {
    return {
      focused: false
    }
  },
  mounted() {
    this.$on('focus', () => {
      this.focused = true
    })
  },
  props: {
    md: { type: Boolean, default: false, }
  },
  directives: { focus },
  components: {AppInput}
}
</script>

<style scoped>

</style>

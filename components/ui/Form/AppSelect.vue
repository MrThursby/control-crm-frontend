<template>
  <div
    tabindex="0"
    class="relative min-w-max outline-none"
    @focus="focused = true"
    @blur="focused = false"
    ref="select"
  >
    <div
      class="bg-white transition duration-150 bg-opacity-5 cursor-pointer rounded flex gap-2 items-center justify-between border w-full px-4 py-3"
      :class="{
        'border-transparent': !focused,
        'rounded-b-none border-primary': focused,
      }"
    >
      <span
        class="font-semibold"
        style="min-width: 8rem;"
        :class="{'uppercase': uppercase}"
      >{{ options[selected].title || '' }}</span>
      <span
        class="transform transition duration-200"
        :class="{ 'rotate-180': focused }"
      ><img src="~assets/arrow.svg" alt="Open" /></span>
    </div>
    <div
      class="absolute transition duration-150 z-20 bg-dark left-0 w-full -mt-px border border-t-0 rounded-b"
      :class="{
        'border-transparent': !focused,
        'border-primary': focused,
      }"
      v-show="focused"
    >
      <div
        class="pl-4 pr-10 h-12 flex items-center cursor-pointer"
        :class="{'uppercase': uppercase}"
        v-for="(option, index) of options"
        @click="() => selectItem(index)"
        :key="index"
      >{{ option.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSelect",
  data: () => ({
    selected: 0,
    focused: false,
  }),
  mounted() {
    this.$emit('input', 0)
  },
  methods: {
    selectItem(index) {
      this.selected = index
      this.$emit('input', index)
      this.$refs.select.blur()
    }
  },
  props: {
    options: null,
    sm: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: false }
  }
}
</script>

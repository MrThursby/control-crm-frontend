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
        'rounded-b-none border-primary': focused && !up,
        'rounded-t-none border-primary': focused && up,
      }"
    >
      <span
        class="font-semibold"
        style="min-width: 8rem;"
        :class="{'uppercase': uppercase}"
        :style="{color: status_colors[options[value].color || 'default']}"
      >{{ options[value].title || '' }}</span>
      <span
        class="transform transition duration-200"
        :class="{ 'rotate-180': focused }"
      ><img src="~assets/arrow.svg" alt="Open" /></span>
    </div>
    <div
      class="absolute transition duration-150 z-20 bg-dark left-0 w-full -mt-px border"
      :class="{
        'border-transparent': !focused,
        'border-primary': focused,
        'bottom-12 border-b-0 rounded-t': up,
        'border-t-0 rounded-b': !up,
      }"
      v-show="focused"
    >
      <div
        class="pl-4 pr-10 h-12 flex items-center cursor-pointer"
        :class="{'uppercase': uppercase}"
        :style="{color: status_colors[options[index].color || 'default']}"
        v-for="(option, index) of options"
        @click="() => selectItem(index)"
        :key="index"
      >{{ option.title }}</div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AppSelect",
  data: () => ({
    selected: 0,
    focused: false,
  }),
  methods: {
    selectItem(index) {
      this.$emit('input', index)
      this.$refs.select.blur()
    }
  },
  computed: {
    ...mapGetters({
      status_colors: 'app/status_colors'
    })
  },
  props: {
    options: null,
    sm: { type: Boolean, default: false },
    uppercase: { type: Boolean, default: false },
    up: { type: Boolean, default: false },
    value: { default: 0}
  }
}
</script>

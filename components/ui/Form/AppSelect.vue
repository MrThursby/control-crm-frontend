<template>
  <div
    tabindex="0"
    class="relative min-w-max outline-none"
    @scroll.prevent="() => { return true }"
  >
    <div v-show="opened === true" @click="close" class="z-20 fixed top-0 left-0 w-screen h-screen"></div>

    <div
      @click="toggle"
      class="bg-white transition duration-150 bg-opacity-5 cursor-pointer rounded flex gap-2 items-center justify-between border w-full px-4 py-3"
      :class="{
        'border-transparent': !opened,
        'rounded-b-none border-primary': opened && !up,
        'rounded-t-none border-primary': opened && up,
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
        :class="{ 'rotate-180': opened }"
      ><img src="~assets/arrow.svg" alt="Open" /></span>
    </div>
    <VueScrollbar
      :speed="2500"
      ref="items-list"
      :class="[ 'items-wrapper', {
          'border-transparent': !opened,
          'border-primary': opened,
          'bottom-12 border-b-0 rounded-t': up,
          'border-t-0 rounded-b': !up,
      } ]"
      v-show="opened"
      @mouseover.native="disableDocumentScroll"
      @mouseout.native="enableDocumentScroll"
    >
      <div>
        <div
          class="pl-4 pr-10 h-12 flex items-center cursor-pointer"
          :class="{'uppercase': uppercase}"
          :style="{color: status_colors[options[index].color || 'default']}"
          v-for="(option, index) of options"
          @click="() => selectItem(index)"
          :key="index"
        >{{ option.title }}</div>
      </div>
    </VueScrollbar>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import VueScrollbar from "vue2-scrollbar"
// import "vue2-scrollbar/style/vue2-scrollbar.css"
// require("vue2-scrollbar/style/vue2-scrollbar.css")

export default {
  name: "AppSelect",
  data: () => ({
    top: null,
    selected: 0,
    opened: false,
    up: false
  }),
  methods: {
    calcUpProp() {
      let bottom = 
        this.$el.offsetParent.clientHeight - 
        this.$el.offsetTop -
        this.$el.clientHeight - 
        this.$refs['items-list'].$el.clientHeight - 2;

      this.up = bottom < 0
    },
    selectItem(index) {
      this.$emit('input', index)
      this.close()
    },
    async open() {
      this.opened = true
      await this.$nextTick()
      this.calcUpProp()
    },
    close() {
      this.opened = false
      this.up = false
    },
    toggle() { this.opened ? this.close() : this.open() },
    preventDefault(e) { e.preventDefault() },
    disableDocumentScroll() {
      window.addEventListener('DOMMouseScroll', this.preventDefault, false)
      document.addEventListener('wheel', this.preventDefault, {passive: false})
      document.addEventListener('scroll', this.preventDefault, {passive: false})
    },
    enableDocumentScroll() {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false)
      document.removeEventListener('wheel', this.preventDefault, {passive: false})
      document.removeEventListener('scroll', this.preventDefault, {passive: false})
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
    //up: { type: Boolean, default: false },
    value: { default: 0}
  },
  components: { VueScrollbar }
}
</script>

<style>
@import "vue2-scrollbar/dist/style/vue2-scrollbar.css";
</style>

<style scoped>
.items-wrapper {
  @apply absolute transition duration-150 z-20 bg-dark left-0 w-full max-h-56 -mt-px border;
}
</style>

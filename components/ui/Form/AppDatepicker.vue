<template>
  <div class="relative" tabindex="0" @focus="opened = true" @blur="opened = false" ref="pickerWrapper">
    <div
      class="bg-white transition bg-opacity-5 px-4 py-3 rounded border cursor-pointer flex items-center gap-2"
      :class="{
            'border-primary': opened,
            'border-transparent': !opened
          }"
    >
      <span class="font-semibold">
        {{
          range.startDate === null || range.endDate === null
            ? 'Выбрать период'
            : `${$moment(range.startDate).format('LL')} - ${$moment(range.endDate).format('LL')}`
        }}
      </span>

      <span
        class="transform transition duration-200"
        :class="{ 'rotate-180': opened }"
      ><img src="~assets/arrow.svg" alt="Open"/></span>
    </div>
    <date-range-picker
      key="datepicker"
      v-show="opened"
      locale="ru"
      class="top-14 absolute right-0 text-black bg-dark z-20"
      :from="range.startDate ? $moment(range.startDate).format() : null"
      :to="range.endDate ? $moment(range.endDate).format() : null"
      :panel="range.panel"
      @update="update"
      @reset="reset"
    />
  </div>
</template>

<script>
export default {
  name: "AppDatepicker",
  data: () => ({
    range: {
      startDate: null,
      endDate: null,
    },
    opened: false
  }),
  methods: {
    update(values) {
      this.range.startDate = values.from
      this.range.endDate = values.to
      this.range.panel = values.panel
      this.$refs.pickerWrapper.blur()
      this.$emit('input', [this.range.startDate, this.range.endDate])
    },
    reset() {
      this.range.startDate = null
      this.range.endDate = null
      this.$refs.pickerWrapper.blur()
      this.$emit('input', [])
    },
  },
}
</script>

<style scoped>

</style>

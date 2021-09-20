<template>
  <div class="relative" tabindex="0" @focus="opened = true" @blur="opened = false" ref="pickerWrapper">
    <div
      class="bg-white transition bg-opacity-5 px-4 py-3 rounded border cursor-pointer flex items-center gap-2"
      :class="{
            'border-primary': opened,
            'border-transparent': !opened
          }"
    >
      <span class="font-semibold">Выбрать период</span>
      <span
        class="transform transition duration-200"
        :class="{ 'rotate-180': opened }"
      ><img src="~assets/arrow.svg" alt="Open" /></span>
    </div>
    <date-range-picker
      key="datepicker"
      v-show="opened"
      locale="ru"
      class="top-14 absolute right-0 text-black bg-dark z-20"
      :from="$moment(range.startDate).format()"
      :to="$moment(range.endDate).format()"
      :panel="range.panel"
      @update="update"
    />
  </div>
</template>

<script>
export default {
  name: "AppDatepicker",
  data: () => ({
    range: {
      startDate: new Date(),
      endDate: new Date(),
    },
    opened: false
  }),
  methods: {
    update(values) {
      this.range.startDate = values.from
      this.range.endDate = values.to
      this.range.panel = values.panel
      this.$refs.pickerWrapper.blur()
      this.makeEvent()
    },
    makeEvent() {
      this.$emit('input', [this.range.startDate, this.range.endDate])
    }
  },
}
</script>

<style scoped>

</style>

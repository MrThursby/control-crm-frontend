<template>
  <div
    class="w-full md:pr-4"
    :class="{
      'md:w-1/2 lg:w-1/3': !half,
      'md:w-1/2': half,
    }">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "InfoCol",
  props: {
    half: {type: Boolean, default: false}
  }
}
</script>

<style scoped>

</style>

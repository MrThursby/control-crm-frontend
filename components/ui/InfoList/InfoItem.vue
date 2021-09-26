<template>
  <div class="flex gap-4 mb-2">
    <div class="flex-shrink-0 font-bold w-2/5 text-light text-opacity-60">{{ name }}:</div>
    <div><slot /></div>
  </div>
</template>

<script>
export default {
  name: "InfoItem",
  props: {
    name: { type: String, required: true }
  }
}
</script>

<style scoped>

</style>

<template>
  <td
    class="py-3 px-2 border-t border-b border-black border-opacity-10"
    :class="{
      'whitespace-nowrap': nowrap,
      'text-center': center,
    }"
  >
    <slot />
  </td>
</template>

<script>
export default {
  name: "AppTableCell",
  props: {
    nowrap: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
  }
}
</script>

<style scoped>

</style>

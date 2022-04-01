<template>
  <div class="w-full overflow-x-auto flex-1">
    <table class="min-w-full table-auto">
      <slot/>
    </table>
  </div>
</template>

<script>
export default {
  name: "AppTable"
}
</script>

<style scoped>

</style>

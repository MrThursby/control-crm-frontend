<template>
  <div>
    <label class="block">
      <span class="block mb-2">{{ label }}</span>
      <slot />
    </label>
    <div v-if="errors.length !== 0" class="mt-2">
      <div
        class="text-danger"
        v-for="(error, index) of errors"
        :key="index">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppFormGroup",
  props: {
    label: { type: String, default: "" },
    errors: { type: Array, default: [] }
  }
}
</script>

<style scoped>

</style>

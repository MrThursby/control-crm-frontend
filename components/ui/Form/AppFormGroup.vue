<template>
  <div>
    <label class="block">
      <span class="block mb-2">{{ label }}</span>
      <slot />
    </label>
    <div v-if="invalid" class="mt-2">
      <app-form-group-error
        v-for="(error, index) of errors"
        :key="index">
        {{ error }}
      </app-form-group-error>
      <slot name="errors" />
    </div>
  </div>
</template>

<script>
import AppFormGroupError from "./AppFormGroupError";
export default {
  name: "AppFormGroup",
  components: {AppFormGroupError},
  props: {
    label: { type: String, default: "" },
    errors: { type: Array, default: () => ([]) },
    invalid: { type: Boolean, default: false }
  }
}
</script>

<style scoped>

</style>

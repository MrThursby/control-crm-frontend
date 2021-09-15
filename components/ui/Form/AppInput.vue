<template>
  <input
    class="bg-white rounded w-full text-sm bg-opacity-5 focus:outline-none focus:bg-black focus:bg-opacity-30 border border-transparent focus:border-primary transition duration-150"
    :class="`px-${px} h-${h}`"
    :type="type"
    :value="value"
    :placeholder="placeholder"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "AppInput",
  props: {
    type: { type: String, default: 'text' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    px: { type: Number, default: 4 },
    h: { type: Number, default: 12 },
  }
}
</script>

<style scoped>

</style>

<template>
  <mask-input
    class="bg-white rounded w-full text-sm bg-opacity-5 focus:outline-none focus:bg-black focus:bg-opacity-30 border transition duration-150"
    :class="[
      `px-${px} h-${h}`,
      { 'border-red-600': invalid },
      { 'border-transparent focus:border-primary': !invalid },
    ]"
    :type="type"
    :value="value"
    :placeholder="placeholder"

    :mask="mask"
    :unmask="unmask"

    @focus="$emit('focus')"
    @blur="$emit('blur')"

    @accept="$emit('input', $event)"
  />
</template>

<script>
import { IMaskComponent } from 'vue-imask';

export default {
  name: "AppInput",
  props: {
    type: { type: String, default: 'text' },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    px: { type: Number, default: 4 },
    h: { type: Number, default: 12 },
    mask: { default: () => { return { lazy: true, mask: undefined } } },
    unmask: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false }
  },
  components: {
    'mask-input': IMaskComponent
  }
}
</script>

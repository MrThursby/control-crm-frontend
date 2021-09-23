<template>
  <li>
    <nuxt-link
      :to="to"
      class="breadcrumbs-item"
      active-class="active"
      exact
    >
      <slot/>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: "BreadcrumbsItem",
  props: {
    to: {type: String, required: true}
  }
}
</script>

<style scoped>
.breadcrumbs-item {
  @apply text-sm text-light text-opacity-60;
}
.active {
  @apply text-light;
}
</style>

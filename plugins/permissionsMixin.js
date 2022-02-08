import Vue from "vue";

Vue.mixin({
  methods: {
    isAbleTo: function (permission) {
      if(!permission) {
        return true
      }

      if (!(this.$store.state.auth.user.permissions instanceof Array)) {
        return this.$auth.user.user.permissions.includes(permission)
      }
      return this.$store.state.auth.user.permissions.includes(permission)
    }
  }
})

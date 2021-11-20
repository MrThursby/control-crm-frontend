import Vue from "vue";

Vue.mixin({
  methods: {
    isAbleTo: function (permission) {
      if(permission === null) {
        return true
      }

      return this.$auth.user.permissions.includes(permission)
    }
  }
})

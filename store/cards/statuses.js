export const state = () => ({
  paginator: {}
})

export const mutations = {
  setPaginator(state, paginator) {
    state.paginator = paginator
  }
}

export const actions = {
  async fetchPaginator({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let paginator = await this.$axios.$get(`/api/admin/cards/statuses?${params}`)
    commit("setPaginator", paginator.data)
  },
}

export const getters = {
  paginator: state => state.paginator
}

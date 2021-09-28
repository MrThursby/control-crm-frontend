export const state = () => ({
  paginator: {},
  item: {},
})

export const mutations = {
  setPaginator(state, paginator) {
    state.paginator = paginator
  },

  setItem(state, item) {
    state.item = item
  },
}

export const actions = {
  async fetchPaginator({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let paginator = await this.$axios.$get(`/api/admin/projects?${params}`)
    commit("setPaginator", paginator.data)
  },

  async fetchItem({ commit }, id) {
    let item = await this.$axios.$get(`/api/admin/projects/${id}`)
    commit("setItem", item.data)
  },
}

export const getters = {
  paginator: state => state.paginator,
  item: state => state.item
}

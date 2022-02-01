export const state = () => ({
  paginator: {},
  item: {},
  roles: [],
})

export const mutations = {
  setPaginator(state, paginator) {
    state.paginator = paginator
  },
  setRoles(state, list) {
    state.roles = list
  },
  setItem(state, item) {
    state.item = item
  },
}

export const actions = {
  async fetchPaginator({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let paginator = await this.$axios.$get(`/api/admin/users-panel?${params}`)
    commit("setPaginator", paginator.data)
  },
  async fetchRoles({ commit }) {
    let list = await this.$axios.$get(`/api/admin/roles`)
    commit("setRoles", list.data)
  },
  async fetchItem({ commit }, id) {
    let item = await this.$axios.$get(`/api/admin/users-panel/${id}`)
    commit("setItem", item.data)
  },
}

export const getters = {
  paginator: state => state.paginator,
  roles: state => state.roles,
  item: state => state.item,
}

export const state = () => ({
  list: []
})

export const mutations = {
  setList(state, list) {
    state.list = list
  }
}

export const actions = {
  async fetchList({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let list = await this.$axios.$get(`/api/admin/regex-banks/types?${params}`)
    commit("setList", list.data)
  },
}

export const getters = {
  list: state => state.list
}

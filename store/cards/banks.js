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

    let paginator = await this.$axios.$get(`/api/admin/banks?${params}`)
    commit("setPaginator", paginator.data)
  },

  async fetchItem({ commit }, id) {
    let item = await this.$axios.$get(`/api/admin/banks/${id}`)
    commit("setItem", item.data)
  },

  async deleteItem({ commit }, id) {
    await this.$axios.$delete(`/api/admin/banks/${id}`)
  },
}

export const getters = {
  paginator: state => state.paginator,
  sortedItems: ({ paginator: { data } }) => [...data].sort((a, b) => a.cards_count > b.cards_count ? -1 : 1), 
  item: state => state.item
}

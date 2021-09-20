export const state = () => ({
  cards: [],
})

export const mutations = {
  setCards(state, cards) {
    state.cards = cards
  },
}

export const actions = {
  async fetchCards({ commit }) {
    let cards = await this.$axios.$get('/api/admin/card')
    commit("setCards", cards)
  }
}

export const getters = {
  cards: state => state.cards,
}

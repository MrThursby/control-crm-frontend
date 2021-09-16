export const state = () => ({
  menu: [
    { to: '/', title: 'home', icon: ['fas', 'home'], exact: true },
    { to: '/debit-cards', title: 'debit-cards', icon: ['fas', 'credit-card'], exact: false },
    { to: '/sim-bank', title: 'sim-bank', icon: ['fa', 'sim-card'], exact: false },
    { to: '/exchange', title: 'phone-numbers', icon: ['fa', 'exchange-alt'], exact: false },
  ],
  dd: {}
})

export const mutations = {
  /*setMenu(state, menu) {
    state.menu = menu
  },*/
  setDD(state, dd) {
    state.dd = dd
  }
}

export const actions = {
  async fetchDD({ commit }) {
    let dd = await this.$axios.$get('/api/')
    commit("setDD", dd)
  }
}

export const getters = {
  menu: state => state.menu,
}

export const state = () => ({
  menu: [
    { to: '/', title: 'home', icon: ['fas', 'home'], exact: true },
    { to: '/debit-cards', title: 'debit-cards', icon: ['fas', 'credit-card'], exact: false },
    { to: '/sim-bank', title: 'sim-bank', icon: ['fa', 'sim-card'], exact: false },
    { to: '/exchange', title: 'phone-numbers', icon: ['fa', 'exchange-alt'], exact: false },
  ],
  perPage: 0,
  perPageOptions: [
    { id: 10, title: '10 записей' },
    { id: 25, title: '25 записей' },
    { id: 75, title: '75 записей' },
    { id: 100, title: '100 записей' },
  ]
})

export const mutations = {
  /*setMenu(state, menu) {
    state.menu = menu
  },*/
  setPerPage(state, perPage) {
    state.perPage = perPage
  }
}

export const actions = {
  async fetchDD({ commit }) {
    let dd = await this.$axios.$get('/api/')
    commit("setDD", dd)
  },
  async changePerPage({ commit }, perPage){
    commit("setPerPage", perPage)
  }
}

export const getters = {
  menu: state => state.menu,
  perPageOptions: state => state.perPageOptions,
  perPage: state => state.perPage,
}

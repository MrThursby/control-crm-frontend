export const state = () => ({
  menu: [
    { to: '/', title: 'home', icon: ['fas', 'home'], exact: true },
    { to: '/cards', title: 'cards', icon: ['fas', 'credit-card'], exact: false },
    { to: '/phones', title: 'phones', icon: ['fa', 'sim-card'], exact: false },
    { to: '/exchanges', title: 'exchanges', icon: ['fa', 'exchange-alt'], exact: false },
  ],
  per_page: 0,
  per_page_options: [
    { id: 10, title: '10 записей' },
    { id: 25, title: '25 записей' },
    { id: 75, title: '75 записей' },
    { id: 100, title: '100 записей' },
  ]
})

export const mutations = {
  setPerPage(state, per_page) {
    state.per_page = per_page
  },
}

export const actions = {
  async changePerPage({ commit }, per_page){
    commit("setPerPage", per_page)
  }
}

export const getters = {
  menu: state => state.menu,
  per_page_options: state => state.per_page_options,
  per_page: state => state.per_page,
}

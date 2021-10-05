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
  ],
  status_colors: {
    default: '#ffffff',
    green: '#10b981',
    orange: '#ff6a00',
    blue: '#2196f3',
    red: '#ff3a3a',
    yellow: '#ffeb3b',
    purple: '#6556ff',
    black: '#777f9e',
    brown: '#bf775c',
  },
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
  status_colors: state => state.status_colors
}

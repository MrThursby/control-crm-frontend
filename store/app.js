export const state = () => ({
  menu: [
    { to: '/', title: 'home', icon: ['fas', 'home'], exact: true, permission: null },
    { to: '/cards', title: 'cards', icon: ['fas', 'credit-card'], exact: false, permission: 'cards-read' },
    { to: '/phones', title: 'phones', icon: ['fa', 'sim-card'], exact: false, permission: 'phones-read' },
    { to: '/exchanges', title: 'exchanges', icon: ['fa', 'exchange-alt'], exact: false, permission: 'exchanges-read' },
    { to: '/users', title: 'users', icon: ['fa', 'user'], exact: false, permission: 'exchanges-read' },
    { to: '/audit', title: 'audit', icon: ['fa', 'file-alt'], exact: false, permission: 'exchanges-read' },
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
    pink: '#f916d7',
    green: '#1efc3f',
    orange: '#ff6a00',
    blue: '#01037c',
    red: '#ff3a3a',
    yellow: '#ffeb3b',
    purple: '#2c013c',
    black: '#777f9e',
    brown: '#bf775c',
    turquoise: '#07f8fc',
  },
  tables: {
    cards: {
      id: { title: '#', show: true },
      project: { title: 'Проект', show: true },
      bank: { title: 'Банк', show: true },
      status: { title: 'Статус', show: true },
      card: { title: 'Номер карты', show: true },
      phone: { title: 'Номер телефона', show: true },
      fio: { title: 'ФИО', show: true },
      codeword: { title: 'Кодовое слово', show: true },
      link_photo: { title: 'Ссылка на фото', show: true },
      comment: { title: 'Комментарий', show: true },
      provider: { title: 'Поставщик', show: true },
      created_at: { title: 'Добавлено', show: true },
    },
  }
})

export const mutations = {
  setPerPage(state, per_page) {
    state.per_page = per_page
  },
  setTableFieldShow(state, {show, table, field}) {
    state.tables[table][field].show = show
  }
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
  status_colors: state => state.status_colors,
  tables: state => state.tables
}

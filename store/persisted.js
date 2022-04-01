export const state = () => ({
    per_page: 0,
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
    per_page: state => state.per_page,
    tables: state => state.tables
  }
  
export const state = () => ({
  cards: [],
  finLog: [],
  selectsData: {},
})

export const mutations = {
  setCards(state, cards) {
    state.cards = cards
  },
  setFinLog(state, finLog) {
    state.finLog = finLog
  },
  setSelectsData(state, data) {
    state.selectsData = data
  }
}

export const actions = {
  async fetchCards({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let cards = await this.$axios.$get(`/api/admin/card?${params}`)
    commit("setCards", cards.cards)

    let selectsData = cards.data
    selectsData.statuses = cards.quantityStatuses
    commit("setSelectsData", cards.data)
  },
  async fetchFinLog({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let finLog = await this.$axios.$get(`/api/admin/finlog?${params}`)
    commit("setFinLog", finLog.FinLogs)
  },
  async fetchSelectsData({ commit }) {
    let data = await this.$axios.$get(`/api/admin/card/create`)

    let selectsData = data.data
    selectsData.statuses = data.statuses
    commit("setSelectsData", selectsData)
  }
}

export const getters = {
  cards: state => state.cards,
  finLog: state => state.finLog,
  selectsData: state => state.selectsData,
}

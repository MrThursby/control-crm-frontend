export const state = () => ({
  cards: [],
  finLog: [],
  banks: [],
  providers: [],
  projects: [],
  regex: [],
  selectsData: {},
})

export const mutations = {
  setCards(state, cards) {
    state.cards = cards
  },
  setFinLog(state, finLog) {
    state.finLog = finLog
  },
  setBanks(state, banks) {
    state.banks = banks
  },
  setProviders(state, providers) {
    state.providers = providers
  },
  setProjects(state, projects) {
    state.projects = projects
  },
  setRegex(state, regex) {
    state.regex = regex
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

  async fetchBanks({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let banks = await this.$axios.$get(`/api/admin/bank?${params}`)
    commit("setBanks", banks.banks)
  },

  async fetchProviders({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let providers = await this.$axios.$get(`/api/admin/provider?${params}`)
    commit("setProviders", providers.providers)
  },

  async fetchProjects({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let projects = await this.$axios.$get(`/api/admin/project?${params}`)
    commit("setProjects", projects.projects)
  },

  async fetchRegex({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let regex = await this.$axios.$get(`/api/admin/regex-bank?${params}`)
    commit("setRegex", regex.regexBanks)
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
  banks: state => state.banks,
  providers: state => state.providers,
  projects: state => state.projects,
  regex: state => state.regex,
  selectsData: state => state.selectsData,
}

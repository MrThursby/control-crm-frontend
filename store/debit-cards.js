export const state = () => ({
  cards: [],
  finLog: [],
  banks: [],
  providers: [],
  projects: [],
  regexes: [],

  selectsData: {},

  card: {},
  bank: {},
  project: {},
  provider: {},
  regex: {},
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
  setRegexes(state, regexes) {
    state.regexes = regexes
  },
  setSelectsData(state, data) {
    state.selectsData = data
  },


  setCard(state, card) {
    state.card = card
  },
  setBank(state, bank) {
    state.bank = bank
  },
  setProject(state, card) {
    state.card = card
  },
  setProvider(state, card) {
    state.card = card
  },
  setRegex(state, card) {
    state.card = card
  },
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
  async fetchRegexes({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let regexes = await this.$axios.$get(`/api/admin/regex-bank?${params}`)
    commit("setRegexes", regexes.regexBanks)
  },
  async fetchSelectsData({ commit }) {
    let data = await this.$axios.$get(`/api/admin/card/create`)

    let selectsData = data.data
    selectsData.statuses = data.statuses
    commit("setSelectsData", selectsData)
  },


  async fetchCard({ commit }, id) {
    let cards = await this.$axios.$get(`/api/admin/card/${id}`)
    commit("setCard", cards.card)
  },
  async fetchBank({ commit }, id) {
    let bank = await this.$axios.$get(`/api/admin/bank/${id}`)
    commit("setBank", bank.bank)
  },
  async fetchProvider({ commit }, id) {
    let cards = await this.$axios.$get(`/api/admin/provider/${id}`)
    commit("setProvider", cards.provider)
  },
  async fetchProject({ commit }, id) {
    let cards = await this.$axios.$get(`/api/admin/project/${id}`)
    commit("setProject", cards.project)
  },
  async fetchRegex({ commit }, id) {
    let cards = await this.$axios.$get(`/api/admin/regex-bank/${id}`)
    commit("setRegex", cards.regexBank)
  },
}

export const getters = {
  cards: state => state.cards,
  finLog: state => state.finLog,
  banks: state => state.banks,
  providers: state => state.providers,
  projects: state => state.projects,
  regexes: state => state.regexes,

  selectsData: state => state.selectsData,

  card: state => state.card,
  bank: state => state.bank,
  project: state => state.card,
  provider: state => state.card,
  regex: state => state.card,
}

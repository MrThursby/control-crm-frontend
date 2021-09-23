export const state = () => ({
  phone_numbers: [],
  api_keys: [],
  app_ids: [],
})

export const mutations = {
  setPhoneNumbers(state, phone_numbers) {
    state.phone_numbers = phone_numbers
  },
  setApiKeys(state, api_keys) {
    state.api_keys = api_keys
  },
  setAppIds(state, app_ids) {
    state.app_ids = app_ids
  },
}

export const actions = {
  async fetchPhoneNumbers({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let phone_numbers = await this.$axios.$get(`/api/admin/phone?${params}`)
    commit("setPhoneNumbers", phone_numbers.phones)
  },
  async fetchApiKeys({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let api_keys = await this.$axios.$get(`/api/admin/api-key?${params}`)
    commit("setApiKeys", api_keys.apiKeys)
  },
  /*async fetchAppIds({ commit }, params) {
    let qs = require('qs')
    params = qs.stringify(params)

    let providers = await this.$axios.$get(`/api/admin/provider?${params}`)
    commit("setProviders", providers.providers)
  },*/
}

export const getters = {
  phone_numbers: state => state.phone_numbers,
  api_keys: state => state.api_keys,
  app_ids: state => state.app_ids,
}

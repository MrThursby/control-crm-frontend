export const state = () => ({
  phone_numbers: [],
  api_keys: [],
  app_ids: [],

  phone_number: {},
  api_key: {},
  app_id: {},
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

  setPhoneNumber(state, phone_number) {
    state.phone_number = phone_number
  },
  setApiKey(state, api_key) {
    state.api_key = api_key
  },
  setAppId(state, app_id) {
    state.app_id = app_id
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

  async fetchPhoneNumber({ commit }, id) {
    let phone_number = await this.$axios.$get(`/api/admin/phone/${id}`)
    commit("setPhoneNumber", phone_number.phone)
  },
  async fetchApiKey({ commit }, id) {
    let api_key = await this.$axios.$get(`/api/admin/api-key/${id}`)
    commit("setApiKey", api_key.apiKey)
  },
/*  async fetchAppId({ commit }, id) {
    let app_id = await this.$axios.$get(`/api/admin/app/${id}`)
    commit("setAppId", app_id.app_id)
  },*/
}

export const getters = {
  phone_numbers: state => state.phone_numbers,
  api_keys: state => state.api_keys,
  app_ids: state => state.app_ids,

  phone_number: state => state.phone_number,
  api_key: state => state.api_key,
  app_id: state => state.app_id,
}

import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import cookie from 'cookie'

export default ({store, req}) => {
  createPersistedState({
    key: 'ccrm-v01042022',
    paths: ['persisted'],
    storage: {
      getItem: key => process.client ? Cookies.get(key) : cookie.parse(req.headers.cookie||'')[key],
      setItem: (key, value) => Cookies.set(key, value, { expires: 60 * 60 * 24 * 30, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })(store)
}

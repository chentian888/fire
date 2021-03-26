import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      houses: [],
      house: {},
      characters: [],
      character: {},
      cities: [],
      products: [],
      user: null,
      authUser: null,
      focusProduct: {}
    },
    getters,
    actions,
    mutations
  })
}

export default createStore

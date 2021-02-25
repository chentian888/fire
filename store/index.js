import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import actions from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      houses: []
    },
    getters,
    actions,
    mutations
  })
}

export default createStore

import Services from './service'
export default {
  async fetchHouses({ state }) {
    const res = await Services.fetchHouses()
    state.houses = res.data.data
    return res
  },
  async fetchHouse({ state }, { id }) {
    const res = await Services.fetchHouse(id)
    console.log(res)
    state.house = res.data.data
    return res
  },
  async fetchCharacters({ state }) {
    const res = await Services.fetchCharacters()
    state.characters = res.data.data
    return res
  },
  async fetchCharacter({ state }, { id }) {
    const res = await Services.fetchCharacter(id)
    state.character = res.data.data
    return res
  },
  async fetchProducts({ state }) {
    const res = await Services.fetchProducts()
    state.products = res.data.data
    return res
  },
  async saveProduct({ state, dispatch }, data = {}) {
    const res = await Services.saveProduct(data)
    dispatch('fetchProducts')
    return res
  },
  async putProduct({ state, dispatch }, data = {}) {
    const res = await Services.putProduct(data)
    dispatch('fetchProducts')
    return res
  },
  async removeProduct({ state, dispatch }, data = {}) {
    const res = await Services.removeProduct(data)
    dispatch('fetchProducts')
    return res
  },
  async adminLogin({ state, commit }, data = {}) {
    const res = await Services.login(data)
    commit('SET_USER', res.data.data)
    return res
  }
}

import Services from './service'
export default {
  // 家族列表
  async fetchHouses({ state }) {
    const res = await Services.fetchHouses()
    state.houses = res.data.data
    return res
  },
  // 家族详情
  async fetchHouse({ state }, { id }) {
    const res = await Services.fetchHouse(id)
    state.house = res.data.data
    return res
  },
  // 人物列表
  async fetchCharacters({ state }) {
    const res = await Services.fetchCharacters()
    state.characters = res.data.data
    return res
  },
  // 任务详情
  async fetchCharacter({ state }, { id }) {
    const res = await Services.fetchCharacter(id)
    state.character = res.data.data
    return res
  },
  // 商品列表
  async fetchProducts({ state }) {
    const res = await Services.fetchProducts()
    state.products = res.data.data
    return res
  },
  // 商品详情
  async fetchFocusProduct({ state }, id) {
    const res = await Services.focusProduct(id)
    state.focusProduct = res.data.data
  },
  // 保存商品
  async saveProduct({ state, dispatch }, data = {}) {
    const res = await Services.saveProduct(data)
    dispatch('fetchProducts')
    return res
  },
  // 更新商品
  async putProduct({ state, dispatch }, data = {}) {
    const res = await Services.putProduct(data)
    dispatch('fetchProducts')
    return res
  },
  // 移除商品
  async removeProduct({ state, dispatch }, data = {}) {
    const res = await Services.removeProduct(data)
    dispatch('fetchProducts')
    return res
  },
  // 管理员登录
  async adminLogin({ state, commit }, data = {}) {
    const res = await Services.login(data)
    commit('SET_USER', res.data.data)
    return res
  },
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.user) {
      const { email, nickname, avatarUrl } = req.session.user
      const user = {
        email,
        nickname,
        avatarUrl
      }
      commit('SET_USER', user)
    }
  },
  // 授权获取用户信息
  async getWechatOAuth({ commit }, { code, state }) {
    const { data = {} } = await Services.getWechatOAuth(code, state)
    commit('SET_AUTHUSER', data.data)
  }
}

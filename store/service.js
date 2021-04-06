import axios from 'axios'
const baseUrl = ''

class Service {
  fetchHouses() {
    return axios.get(`${baseUrl}/wiki/houses`)
  }
  fetchHouse(id) {
    return axios.get(`${baseUrl}/wiki/houses/${id}`)
  }
  fetchCharacters() {
    return axios.get(`${baseUrl}/wiki/characters`)
  }
  fetchCharacter(id) {
    return axios.get(`${baseUrl}/wiki/characters/${id}`)
  }
  fetchProducts() {
    return axios.get(`${baseUrl}/api/products`)
  }
  focusProduct(id) {
    return axios.get(`${baseUrl}/api/products/${id}`)
  }
  saveProduct(data = {}) {
    return axios.post(`${baseUrl}/api/products`, { ...data })
  }
  putProduct(data = {}) {
    return axios.put(`${baseUrl}/api/products`, { ...data })
  }
  removeProduct(params = {}) {
    return axios.delete(`${baseUrl}/api/products`, { params })
  }
  
  // 创建订单
  createOrder(data) {
    return axios.post(`${baseUrl}/api/createOrder`, { ...data })
  }

  // 订单列表
  fetchPayment() {
    return axios.get(`${baseUrl}/api/payment`)
  }

  login(data = {}) {
    return axios.post(`${baseUrl}/admin/login`, { ...data })
  }
  getWechatOAuth(code, state) {
    return axios.get(`${baseUrl}/wechat-oauth`, { params: { code, state } })
  }
  getWechatSignature(url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${url}`)
  }
}

export default new Service()

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
  saveProduct(data = {}) {
    return axios.post(`${baseUrl}/api/products`, { ...data })
  }
  putProduct(data = {}) {
    return axios.put(`${baseUrl}/api/products`, { ...data })
  }
  removeProduct(params = {}) {
    return axios.delete(`${baseUrl}/api/products`, { params })
  }
  login(data = {}) {
    return axios.post(`${baseUrl}/admin/login`, { ...data })
  }
  getWechatOAuth(url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${encodeURIComponent(url)}`)
  }
}

export default new Service()

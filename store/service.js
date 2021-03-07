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
}

export default new Service()

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
}

export default new Service()

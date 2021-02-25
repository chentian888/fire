import Services from './service'
export default {
  async fetchHouses({ state }) {
    const res = await Services.fetchHouses()
    state.houses = res.data.data
    return res
  }
}

import service from './service'
export default {
  SET_USER(state, user) {
    state.user = user
  },
  SET_AUTHUSER(state, user) {
    state.authUser = user
  }
}

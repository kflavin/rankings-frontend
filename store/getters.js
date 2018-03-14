export const getters = {
  isAuthenticated: function (state) {
    return state.user !== undefined && Object.keys(state.user).length > 0
  },
  currentYear: function (state) {
    return state.currentYear
  },
  onServer: function (state) {
    return state.onServer
  },
  getUserName: function (state) {
    return state.username
  },
  getToken: function (state) {
    return state.token
  },
  isSubmitted: function (state) {
    return state.submitted
  },
  getUser: function (state) {
    return state.user
  }
}

export default getters

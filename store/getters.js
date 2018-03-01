export const getters = {
  isAuthenticated: function (state) {
    return !!state.userId
  },
  currentYear: function (state) {
    return state.currentYear
  },
  onServer: function (state) {
    return state.onServer
  },
  getUserName: function (state) {
    console.log(state)
    return state.username
  },
  getToken: function (state) {
    return state.token
  },
  isSubmitted: function (state) {
    return state.submitted
  },
  getRoleId: function (state) {
    return state.roleId
  }
}

export default getters

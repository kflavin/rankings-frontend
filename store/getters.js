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
  },
  getRole: function (state) {
    return state.role
  },
  getUser: function (state) {
    return state.user
  }
}

export default getters

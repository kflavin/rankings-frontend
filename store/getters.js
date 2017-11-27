

export const getters = {
  isAuthenticated: function(state) {
    return !!state.userId
  },
  currentYear: function(state) {
    return state.currentYear
  }
}

export default getters



export const getters = {
  isAuthenticated: function(state) {
    return !!state.userId
  }
}

export default getters

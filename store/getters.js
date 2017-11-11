

export const getters = {
  isAuthenticated: function(state) {
    console.log("store getters, user id = " + state.userId)
    return !!state.userId
  }
}

export default getters

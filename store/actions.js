export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log("nuxtServerInit")
    // if (req.session && req.session.authUser) {
    //   commit('SET_USER', req.session.authUser)
    // }
  }
}

export default actions

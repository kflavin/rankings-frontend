import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'

const createStore = () => {
  return new Vuex.Store({
    state: {
      userId: 0,
      username: "",
      selections: [],
      user: {},
      token: "",
      currentYear: 0
    },
    mutations,
    getters
  })
}

export default createStore

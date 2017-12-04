import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const createStore = () => {
  return new Vuex.Store({
    state: {
      userId: 0,
      username: '',
      selections: [],
      user: {},
      token: '',
      currentYear: 0,
      onServer: false
    },
    mutations,
    getters,
    actions
  })
}

export default createStore

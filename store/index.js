import Vuex from 'vuex'

import mutations from './mutations'

const createStore = () => {
  return new Vuex.Store({
    state: {
      userId: 0,
      selections: []
    },
    mutations
  })
}

export default createStore

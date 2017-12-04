export const mutations = {

  setOnServer: function (state, onServer) {
    console.log('setting onServer state')
    state.onServer = onServer
  },

  setCurrentYear: function (state, year) {
    state.currentYear = year
  },

  setCurrentUserName: function (state, username) {
    state.username = username
  },
  clearCurrentUserName: function (state, username) {
    state.username = ''
  },

  setCurrentUserId: function (state, userId) {
    state.userId = userId
  },
  clearCurrentUserId: function (state) {
    state.userId = 0
  },

  setCurrentUser: function (state, user) {
    state.user = user
  },
  clearCurrentUser: function (state, user) {
    state.user = {}
  },

  setToken: function (state, token) {
    state.token = token
  },
  clearToken: function (state) {
    state.token = ''
  },
  setTeams: function (state, teams) {
    state.teams = teams
  },
  clearTeams: function (state) {
    state.teams = {}
  },
  addSelection: function (state, selection) {
    if (state.selections.indexOf(selection) < 0) {
      state.selections.push(selection)
    } else {
    }
  },
  delSelection: function (state, selection) {
    state.selections.splice(state.selections.indexOf(selection), 1)
  },
  setSelections: function (state, selections) {
    state.selections = selections
  },
  clearSelections: function (state) {
    state.selections = []
  }
}

export default mutations

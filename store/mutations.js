const mutations = {
  setCurrentUser: function(state, userId) {
    state.userId = userId;
  },
  clearCurrentUser: function(state) {
    state.userId = 0;
  },

  setTeams: function(state, teams) {
    state.teams = teams;
  },
  clearTeams: function(state) {
    state.teams = {};
  },

  addSelection: function(state, selection) {
    if (state.selections.indexOf(selection) < 0) {
      state.selections.push(selection)
    } else {
    }
  },
  delSelection: function(state, selection) {
    state.selections.splice(state.selections.indexOf(selection), 1)

  },
  setSelections: function(state, selections) {
    state.selections = selections;
  },
  clearSelections: function(state) {
    state.selections = []
  }
}

export default mutations

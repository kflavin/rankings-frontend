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
      console.log("adding... " + selection)
      state.selections.push(selection)
    } else {
      console.log("already exists...")
    }
    console.log(state.selections)
  },
  delSelection: function(state, selection) {
    state.selections.slice(state.selection.indexOf(selection), 1)
  },
  setSelections: function(state, selections) {
    state.selections = selections;
  },
  clearSelections: function(state) {
    state.selections = []
  }
}

export default mutations

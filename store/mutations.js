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
    console.log("ADD SELECTIONS CALLED")

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
    console.log("SET SELECTIONS CALLED")
    state.selections = selections;
  },
  clearSelections: function(state) {
    console.log("CLEAR SELECTIONS CALLED")
    state.selections = []
  }
}

export default mutations

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
  }
}

export default mutations

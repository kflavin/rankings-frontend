<template>
  <div>
    <nav-bar></nav-bar>
    <div>
      <h1>New Submission for week <span v-if="week">{{ week.date}}</span></h1>
    </div>
    <div>
      <submit-item
      v-for="rank in this.positions"
      :rank="rank"
      :key="rank"
      :teams="teams"
      :selections="selections"
      v-on:initSelections="initSelections"
      v-on:addteam="addTeam"
      v-on:removeteam="removeTeam">
      </submit-item>
      <button @click="submit">Submit</button>
      <button @click="reset">Reset</button>
    </div>

    <div>
      <br/>
      <router-link to="/">Weeks Index</router-link>
    </div>
  </div>
</template>

<script>
  import allTeams from '@/apollo/queries/allTeams'
  import currentWeek from '@/apollo/queries/currentWeek'
  import submitUserRankings from '@/apollo/queries/mutations/submitUserRankings'
  import SubmitItem from '@/components/SubmitItem'
  import NavBar from '~/components/NavBar'

  export default {
    components: {
      SubmitItem,
      NavBar
    },
    created: function() {
      console.log("userid:")
      console.log(this.$store.state.userId)
    },
    middleware: 'auth',
    methods: {
      addTeam(team) {
        if (!this.selections.includes(team.toLowerCase())) {
          this.selections.push(team.toLowerCase())
        }
      },
      removeTeam(team) {
        this.selections.splice(this.selections.indexOf(team.toLowerCase()), 1)
      },
      initSelections() {
        this.selections = []
      },
      reset() {
        this.query = ''
      },
      submit() {

        console.log("user id is: " + this.$store.state.userId)
        var userid = this.$store.state.userId

        if (this.selections.length !== this.positions) {
          alert("Invalid number of entries")
          return
        }


        this.$apollo.mutate({
          mutation: submitUserRankings,
          variables: {
            weekid: parseInt(this.week.id),
            userid: userid,
            teams: this.selections
          }
        }).then(data => {
          console.log("Selections submitted")
          console.log(data)
          this.$emit('selectionsSubmitted')
          this.$router.push({name: "week-id", params: {id: this.week.id}})
        })
      }
    },
    props: {
      startAt: {
        type: Number,
        default: 3
      },
      positions: {
        type: Number,
        default: 10
      }
    },
    data: function() {
      return {
        teams: [],
        selections: []
      }
    },
    apollo: {
      teams: {
        query: allTeams,
        update: function(data) {
          return data.teams;
        }
      },
      week: {
        query: currentWeek,
        update: function(data) {
          return data.currentWeek
        }
      }
    }
  }
</script>

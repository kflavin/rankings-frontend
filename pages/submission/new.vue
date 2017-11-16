<template>
  <div>
    <div>
      <h1>New Submission for week <span v-if="week">{{ week.date}}</span></h1>
    </div>

    <div v-if="submission"><nuxt-link :to="`/submission/${this.submission.id}`">Your submission is in!</nuxt-link></div>
    <div v-else>
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
      <nuxt-link to="/">Weeks Index</nuxt-link>
    </div>
  </div>
</template>

<script>
  import { destroyToken } from '@/utils/auth'
  import allTeams from '@/apollo/queries/allTeams'
  import currentWeek from '@/apollo/queries/currentWeek'
  import mySubmission from '@/apollo/queries/mySubmission'
  import submitUserRankings from '@/apollo/queries/mutations/submitUserRankings'
  import SubmitItem from '@/components/SubmitItem'

  export default {
    components: {
      SubmitItem
    },
    created: function() {
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
        selections: [],
        submission: null
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
      },
      submission: {
        query: mySubmission,
        error: (error) => {
          this.submission = null
          if (error.message.toLowerCase() == "GraphQL error: Not logged in".toLowerCase()) {
            console.log("logging you out")
            this.submission = null
            destroyToken(this.$store)
          }
        },
        errorPolicy: "all",
        update: function(data) {
          console.log("calling update")
          console.log(data.mySubmission)
          return data.mySubmission
        }
      }
    }
  }
</script>

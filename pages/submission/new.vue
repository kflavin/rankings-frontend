<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column"><h1>Week <span v-if="week">{{ week.id}} Submission</span></h1></div>
      <div class="column"></div>
    </div>


    <div v-if="submission"><nuxt-link :to="`/submission/${this.submission.id}`">Your submission is in!</nuxt-link></div>
    <div v-else>
      <submit-item
      v-for="rank in this.positions"
      :rank="rank"
      :key="rank"
      :teams="teams"
      :selections="selections"
      :resetField="resetField"
      v-on:resetOff="resetOff"
      v-on:initSelections="initSelections"
      v-on:addteam="addTeam"
      v-on:removeteam="removeTeam">
      </submit-item>
      <br />
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button class="button is-primary" @click="submit">Submit</button>
        </p>
        <p class="control">
          <button class="button is-primary is-outlined" @click="reset()">Reset</button>
        </p>
      </div>
      <div class="field is-grouped is-grouped-centered">
        <div>
          <nuxt-link to="/">Weeks Index</nuxt-link>
        </div>
      </div>

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
  import {mapGetters} from 'vuex'

  export default {
    components: {
      SubmitItem,
      ...mapGetters(['currentYear'])
    },
    created: function() {
    },
    watch: {
      resetCounter(c) {
//        console.log("counter is " + c)
        if (c > 9) {
//          console.log("set to off")
          this.resetField = false
          this.resetCounter = 0
        }
      }
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
        this.resetField = true
      },
      resetOff() {
        this.resetCounter++
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
          this.$router.push({name: "year-week-id", params: {year: 2017, id: this.week.id}})
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
        submission: null,
        resetField: false,
        resetCounter: 0
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
//        error: (error) => {
//          this.submission = null
//          if (error.message.toLowerCase() == "GraphQL error: Not logged in".toLowerCase()) {
//            console.log("logging you out")
//            this.submission = null
//            destroyToken(this.$store)
//          } else if (error.message.toLowerCase() == "could not find submission for user") {
//            console.log("No current submission for this user")
//          }
//        },
        errorPolicy: "none",
        update: function(data) {
          console.log("calling update")
          console.log(data.mySubmission)
          return data.mySubmission
        }
      }
    }
  }
</script>

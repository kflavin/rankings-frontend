<template>
  <div>
    <div class="columns">
      <div class="column"></div>
      <div class="column" v-if="currentWeek"><h1>{{parseInt(week.num)?"":"Final"}} Week <span>{{ week.num || ""}} Submission</span></h1></div>
      <div class="column" v-else><h1>Submissions Closed</span></h1></div>
      <div class="column"></div>
    </div>


    <div v-if="!currentWeek">Voting is open between Sunday and Tuesday.  <nuxt-link :to="'/'">Go back</nuxt-link></div>
    <div v-else-if="submission"><nuxt-link :to="'/'+(weeknum === 0 ? parseInt(currentYear)+1:currentYear)+`/submission/${username}/${weeknum}`">Your submission is in!</nuxt-link></div>
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
      SubmitItem
    },
    computed: {
      ...mapGetters(['currentYear', 'onServer', 'getUserName', 'getToken']),
      weeknum() {
        return this.week.num
      },
      username() {
        console.log("computed username")
        console.log(this.getUserName)
        return this.getUserName
      },
      year() {
        return this.week.date.split("-")[0]
      },
      currentWeek() {
        return this.week ? true : false
      }
    },
    created: function() {
      console.log("onServer")
      console.log(this.onServer)
    },
    mounted() {
      console.log("New Submission, mounted")
      // var link = this.$apollo.vm.$root._apolloProvider.clients.defaultClient.link
      // console.log(this.$apollo.vm.$root._apolloProvider.clients.defaultClient)
      // link.request()

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

        var user = this.$store.state.user
        console.log("user id")
        console.log(user)

        if (this.selections.length !== this.positions) {
          alert("Invalid number of entries")
          return
        }
        console.log("Submnitting the following")
        console.log(this.week.id)
        console.log(user)
        console.log(this.selections)


        this.$apollo.mutate({
          mutation: submitUserRankings,
          variables: {
            weekid: parseInt(this.week.id),
            userid: user.userid,
            teams: this.selections
          }
        }).then(data => {
          this.$emit('selectionsSubmitted')
          this.$router.push({name: "year-week-num", params: {year: this.year, num: this.week.num}})
        }).catch(error => {
          console.log("got an error submitting")
          console.log(error)
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
          console.log("All teams retrieved")
          console.log(data)
          return data.teams;
        }
      },
      week: {
        query: currentWeek,
        update: function(data) {
          console.log("analyze the current week")
          console.log(data)
          return data.currentWeek
        }
      },
      submission: {
        query: mySubmission,
        error: (error) => {
          console.log(error.message.toLowerCase())
          if (error.message.toLowerCase().match("not logged in")) {
            console.log("destroy the token")
//            destroyToken(this.$store)
          }
        },
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
//        errorPolicy: "none",
        update: function(data) {
          console.log("checking for my submission")
          console.log(data.mySubmission)
          return data.mySubmission
        },
        fetchPolicy: 'network-only'
      }
    }
  }
</script>

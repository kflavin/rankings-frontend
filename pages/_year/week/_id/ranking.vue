<template>
  <div>
    <h1>Rankings for week: {{weekid}}</h1>

    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ranking in rankings">
          <td>{{ranking[0]}}</td>
          <td>{{ranking[1]}}</td>
        </tr>
      </tbody>
    </table>


    <p><nuxt-link :to="`/`">Return to week's index</nuxt-link></p>
  </div>
</template>

<script>
  import weekRanking from '@/apollo/queries/weekRanking'

  export default {
    created() {
      console.log("route param " + this.$route.params.id)
      console.log("computed " + this.weekid)
    },
    computed: {
      weekid() {
        console.log("week id is " + this.$route.params.id)
        return this.$route.params.id
      }
    },
    props: {
      week: {
        type: Object,
        default: () => {
          return {id: 1}
        }
      }
    },
    apollo: {
      rankings: {
        query: weekRanking,
        update: function(data) {
          var d = JSON.parse(data.weekRanking.rankings)



          console.log("rankings")
          console.log(data.weekRanking.rankings)
          console.log(JSON.parse(data.weekRanking.rankings))
          console.log(d[1])
          return JSON.parse(data.weekRanking.rankings)
        },
        variables() {
          console.log("here we are in variables! " + this.weekid)
          return {
            weekid: this.weekid
          }
        },
        fetchPolicy: 'network-only'
      }
    }


//    apollo: {
//      teams: {
//        query: allTeams,
//        update: function(data) {
//          return data.teams;
//        }
//      },
//      week: {
//        query: currentWeek,
//        update: function(data) {
//          return data.currentWeek
//        }
//      },
//      submission: {
//        query: mySubmission,
//        error: (error) => {
//          this.submission = null
//          if (error.message.toLowerCase() == "GraphQL error: Not logged in".toLowerCase()) {
//            console.log("logging you out")
//            this.submission = null
//            destroyToken(this.$store)
//          }
//        },
//        errorPolicy: "all",
//        update: function(data) {
//          console.log("calling update")
//          console.log(data.mySubmission)
//          return data.mySubmission
//        }
//      }
//    }
  }
</script>

<style>
</style>

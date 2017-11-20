<template>
  <div>
    <h1>Rankings for week: {{weekid}}</h1>

    <p>
      here
    </p>

    <p><nuxt-link :to="`/`">Return to week's index</nuxt-link></p>
  </div>
</template>

<script>
  import weekRanking from '@/apollo/queries/weekRanking'

  export default {
    created() {
      console.log("week created")
      console.log(this.week)
      console.log(this.$route.params.id)
    },
    computed: {
      weekid() {
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
          console.log("rankings")
          console.log(data.weekRanking.rankings)
          console.log(JSON.parse(data.weekRanking.rankings))
          return data.weekRanking
        }
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

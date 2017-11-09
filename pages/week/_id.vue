<template>
  <div>
    <nav-bar></nav-bar>
    <div>
      <h1>Submissions for Week <span v-if="weeks">{{weeks[0].id}}</span></h1><br/>
    </div>

    <div>

      <div >
      <submission-item
      v-for="submission in weeks[0].submissions"
      :key="submission.id"
      :submission="submission">
      </submission-item>
      </div>

      <div>
        <br/>
        <router-link to="/">Weeks Index</router-link>
      </div>

    </div>
  </div>
</template>


<script>
  import SubmissionsByWeek from '@/apollo/queries/submissionByWeek'
  import SubmissionItem from '@/components/SubmissionItem'
  import NavBar from '~/components/NavBar'

  export default {
    components: {
      SubmissionItem,
      NavBar
    },
    created() {
      this.weekid = this.$route.params.id
//      console.log("Your weeks---")
//      console.log(this.$route.params)
//      console.log(this.weeks)
//      console.log("done...")



//      this.$apollo.addSmartQuery('weeks', {
//          query: SubmissionsByWeek,
//            variables: function() {
//            return {
//              id: this.weekid
//            }
//          },
//          error(error) {
//            console.error(error)
//          }
//      })





    },
    data: function() {
      return {
        weekid: 1,
        weeks: []
      }
    },
    apollo: {
      weeks: {
        query: SubmissionsByWeek,
        variables: function() {
          return {
            id: this.weekid
          }
        },
        error(error) {
          console.error(error)
        },
        fetchPolicy: 'network-only'
      }
    }
  }

</script>

<style>

</style>

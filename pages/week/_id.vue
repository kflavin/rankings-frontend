<template>
  <div>
    <nav-bar></nav-bar>
    <div>
      <h1>Submissions for Week {{weeks[0].id}}</h1><br/>
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
    created: function() {
      console.log("state is=")
      console.log(this.$store.state)
      console.log('weeks length')
      console.log(this.weeks)
    },
    data: function() {
      return {
        date: '',
        weeks: []
      }
    },
    apollo: {
      weeks: {
        prefetch: true,
        query: SubmissionsByWeek,
        variables: function() {
          return {
            id: this.$route.params.id
          }
        },
        error(error) {
          console.error(error)
          console.log(error)
        }
      }
    }
  }

</script>

<style>

</style>

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
    created: function() {
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
        }
      }
    }
  }

</script>

<style>

</style>

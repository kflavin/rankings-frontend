<template>
  <div>
    <div>
      <h1>Submissions for Week {{weeks[0].id}}</h1><br/>
    </div>

    <div>
      <submission-item
      v-for="submission in weeks[0].submissions"
      :key="submission.id"
      :submission="submission">
      </submission-item>

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

  export default {
    components: {
      SubmissionItem
    },
    created: function() {
      console.log("params")
      console.log(this.$route.params)
      console.log("your weeks")
      console.log(this.weeks)
      console.log("your submissions")
//      console.log(this.weeks[0].submissions)
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

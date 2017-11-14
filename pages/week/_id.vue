<template>
  <div>
    <div>
      <h1>Submissions for Week {{weekid}}</h1><br/>
    </div>

    <div>

      <div >
      <submission-item
      v-for="submission in submissions"
      :key="submission.id"
      :submission="submission">
      </submission-item>
      </div>

      <div>
        <br/>
        <nuxt-link to="/">Weeks Index</nuxt-link>
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
    computed: {
      weekid() {
        return this.$route.params.id
      },
      submissions() {
        if (this.week) {
          return this.week.submissions
        } else {
          return null
        }
      }
    },
    created() {
//      this.weekid = this.$route.params.id
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
        week: null
      }
    },
    apollo: {
      week: {
        query: SubmissionsByWeek,
        variables: function() {
          return {
            id: this.weekid
          }
        },
        error(error) {
          console.error(error)
        },
        update(data) {
          return data.weeks[0]
        },
        fetchPolicy: 'network-only'
      }
    }
  }

</script>

<style>

</style>

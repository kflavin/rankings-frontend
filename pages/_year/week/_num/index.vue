<template>
  <div>
    <div>
      <h1>Submissions for {{parseInt(weeknum) === 0?"Final":""}} Week {{parseInt(weeknum) || ""}}</h1><br/>
    </div>

    <div>

      <div >
      <submission-item
      v-for="submission in submissions"
      :key="submission.id"
      :submission="submission"
      :currentYear="currentYear"
      :weeknum="weeknum">
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
      currentYear() {
        return this.$route.params.year
      },
      weeknum() {
//        return this.week == null ? null : this.week.num
        return this.$route.params.num
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
            num: this.weeknum,
            year: this.currentYear
          }
        },
        error(error) {
          console.error(error)
        },
        update(data) {
          console.log(data)
          return data.weeks[0]
        },
        fetchPolicy: 'network-only'
      }
    }
  }

</script>

<style>

</style>

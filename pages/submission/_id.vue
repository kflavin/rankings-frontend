<template>
  <div>
    <div>
      <h1>Week {{weekid}} rankings for {{username}}</h1><br />
    </div>
    <div>
      <ranking-item
      v-for="ranking in rankings"
      :key="ranking.id"
      :ranking="ranking">
      </ranking-item>
    </div>

    <div>
      <br />
      <nuxt-link :to="`/week/${this.weekid}`">Return to week {{weekid}} listings</nuxt-link>
    </div>
  </div>
</template>

<script>
  import rankingsBySubmissionId from '@/apollo/queries/rankingsBySubmissionId'
  import weekOfSubmission from '@/apollo/queries/weekOfSubmission'
  import RankingItem from '@/components/RankingItem'
  import {sortByKey} from '@/utils.js'

//  function sortByKey(array, key) {
//    return array.sort(function(a, b) {
//      var x = a[key];
//      var y = b[key];
//      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//    });
//  }

  export default {
    created: function() {
//      console.log("rankings by submission id")
//      console.log(rankingsBySubmissionId)
//      console.log(this.submissions)
    },
    components: {
      RankingItem
    },
    data: function() {
      return {
        'rankings': null,
        'submission': null
      }
    },
    computed: {
      weekid() {
        return this.submission ? this.submission.week.id : null
      },
      username() {
        return this.submission ? this.submission.user.name : null
      }
    },
    apollo: {
      rankings: {
        query: rankingsBySubmissionId,
        update: function(data) {
          var arr = data.submissions[0].rankings.slice(0)
          return arr
        },
        variables: function() {
          return {
            id: this.$route.params.id
          }
        }
      },
      submission: {
        update: function(data) {
          return data.submissions[0]
        },
        query: weekOfSubmission,
        variables: function() {
          return {
            id: this.$route.params.id
          }
        }
      }
    }
  }
</script>

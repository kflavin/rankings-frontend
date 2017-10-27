<template>
  <div>
    <div>Rankings</div>
    <ranking-item
    v-for="ranking in rankings"
    :key="ranking.id"
    :ranking="ranking">
    </ranking-item>

    <div>
      <router-link to="/">Return to week {{week.date}}</router-link>
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
      console.log("submissions")
      console.log(this.submissions)
//      console.log("rankings by submission id")
//      console.log(rankingsBySubmissionId)
//      console.log(this.submissions)
    },
    components: {
      RankingItem
    },
    data: function() {
      return {
        'rankings': [],
        'week': {}
      }
    },
    apollo: {
      rankings: {
        query: rankingsBySubmissionId,
        update: function(data) {
          console.log(data.submissions[0].rankings)
          var arr = data.submissions[0].rankings.slice(0)
          console.log(sortByKey(arr, "position"));
          return arr
        },
        variables: function() {
          return {
            id: this.$route.params.id
          }
        }
      },
      week: {
        update: function(data) {
          console.log(data.submissions[0].week)
          return data.submissions[0].week
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

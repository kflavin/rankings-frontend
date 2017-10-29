<template>
  <div>
    <div>
      <h1>Week {{data.week.id}} rankings for {{data.user.name}}</h1><br />
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
      <router-link :to="`/week/${data.week.id}`">Return to week {{data.week.id}} listings</router-link>
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
        'data': {}
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
      data: {
        update: function(data) {
          console.log(data.submissions[0].week)
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

<template>
  <div>
    <div>Rankings</div>
    <ranking-item
    v-for="ranking in rankings"
    :key="ranking.id"
    :ranking="ranking">
    </ranking-item>
  </div>
</template>

<script>
  import rankingsBySubmissionId from '@/apollo/queries/rankingsBySubmissionId'
  import RankingItem from '@/components/RankingItem'

  function sortByKey(array, key) {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  var arr = [{pos: 2}, {pos: 3}, {pos: 1}]
console.log(arr)

console.log(sortByKey(arr, "pos"))


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
        'rankings': []
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
      }
    }
  }
</script>

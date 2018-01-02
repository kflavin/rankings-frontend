<template>
  <div>
    <div>
      <h1>Week {{weeknum}} rankings for {{username}}</h1><br />
    </div>
    <div>
      <ranking-item
      v-for="ranking in rankingsList"
      :key="ranking.id"
      :ranking="ranking">
      </ranking-item>
    </div>

    <div>
      <br />
      <nuxt-link :to="`/${year}/week/${this.weeknum}`">Return to week {{weeknum}} listings</nuxt-link>
    </div>
  </div>
</template>

<script>
  import rankingsBySubmissionNum from '@/apollo/queries/submissions/rankingsBySubmissionNum'
  import weekOfSubmission from '@/apollo/queries/submissions/weekOfSubmission'
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
      rankingsList() {
        console.log("rankingsList")
        console.log(this.rankings)

//        if (this.rankings == null) {
//          console.log("is null!!!")
//          return null
//        } else {
//          console.log("is not null!!!")
//          return this.rankings.rankings
//        }
        return this.rankings != null ? this.rankings.rankings : null
//        return this.rankings
      },
      year() {
        return this.$route.params.year
      },
      weeknum() {
        console.log("weeknum")
        console.log(this.rankings)
        return this.rankings ? this.rankings.week.num : null
      },
      username() {
        console.log("username")
//        console.log(this.rankings.user.name)
        return this.rankings ? this.rankings.user.name : null
      }
    },
    apollo: {
      rankings: {
        query: rankingsBySubmissionNum,
        update: function(data) {
          console.log("rankingsBySubmissionNum")
          console.log(data.submissions[0].user)
          console.log(data.submissions[0].rankings)
          console.log(data.submissions[0].week)
          var arr = data.submissions[0].rankings.slice(0)
          return data.submissions[0]
        },
        variables: function() {
          console.log("set variables")
          console.log(this.$route.params)
          return {
            num: this.$route.params.id,
            year: this.$route.params.year,
            user: this.$route.params.user
          }
        },
        fetchPolicy: 'network-only'
      },
//      submission: {
//        update: function(data) {
//          return data.submissions[0]
//        },
//        query: weekOfSubmission,
//        variables: function() {
//          return {
//            id: this.$route.params.id
//          }
//        }
//      }
    }
  }
</script>

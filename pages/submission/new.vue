<template>
  <div>
    <div>
      <h1>New Submission for week ...</h1>
    </div>
    <div>
      <submit-item
      v-for="rank in teams.length"
      :rank="rank"
      :keyid="rank">
      </submit-item>
    </div>
  </div>
</template>

<script>
  import allTeams from '@/apollo/queries/allTeams'
  import SubmitItem from '@/components/SubmitItem'

  export default {
    components: {
      SubmitItem
    },
    data: function() {
      return {
        teams: []
      }
    },
    apollo: {
      teams: {
        query: allTeams,
        update: function(data) {
          console.log("this: ");
          console.log(this)
          this.$store.commit('setTeams', data.teams);
          return data.teams;
        }
      }
    }
  }
</script>

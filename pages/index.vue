<template>
  <div>
    <div>
      <h1>Weekly Rankings</h1><br/>
    </div>

    <div>
      <table>
        <thead>
          <th>Week</th>
          <th>User Submissions</th>
          <th>Rankings</th>
        </thead>
        <tbody>
          <tr
          v-for="week in weeks"
          :key="week.id"
          :week="week"
          is="week-item">
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import Logo from '~/components/Logo'
import WeekItem from '~/components/WeekItem'

//import { ALL_WEEKS_QUERY } from '@/assets/graphql.js'
//import allWeeks from '~/apollo/queries/allWeeks.gql'
import weeks from '~/apollo/queries/allWeeksSimple.gql'
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated']),
  components: {
    WeekItem,
    Logo
  },
  methods: {
    runit: function() {
    }
  },
  data: function() {
    return {
      allWeeks: []
    }
  },
  apollo: {
    weeks: {
      prefetch: true,
      query: weeks
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

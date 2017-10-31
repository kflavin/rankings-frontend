<template>
  <div>
    <nav-bar></nav-bar>

    <div>
      <h1>Per Week Rankings</h1><br/>
    </div>

    <div>
      <week-item
      v-for="week in weeks"
      :key="week.id"
      :week="week">
      </week-item>
    </div>

  </div>
</template>

<script>
import Logo from '~/components/Logo'
import WeekItem from '~/components/WeekItem'
import NavBar from '~/components/NavBar'

//import { ALL_WEEKS_QUERY } from '@/assets/graphql.js'
//import allWeeks from '~/apollo/queries/allWeeks.gql'
import weeks from '~/apollo/queries/allWeeksSimple.gql'


export default {
  components: {
    WeekItem,
    Logo,
    NavBar
  },
  methods: {
    runit: function() {
      console.log('ran it')
      console.log(this.weeks)
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

<template>
  <div>
    <div>
      <h1>Weekly Rankings</h1>
      <select v-model="selectedYear">
        <option v-for="year in allYears" :key="year">{{year}}</option>
      </select>
      Year: {{currentYr}}
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>User Submissions</th>
            <th>Rankings</th>
          </tr>
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
import years from '~/apollo/queries/allYears'

//import { ALL_WEEKS_QUERY } from '@/assets/graphql.js'
//import allWeeks from '~/apollo/queries/allWeeks.gql'
import weeks from '~/apollo/queries/allWeeksSimple.gql'
import { mapGetters } from 'vuex'

export default {
  updated() {
    console.log("updated hook")
    this.$store.commit('setCurrentYear', this.selectedYear)
  },
  beforeUpdate() {
    console.log("before update hook")
  },
  beforeMount() {
    console.log("before mount hook")
  },
  activated() {
    console.log("activated hook")
  },
  deactivated() {
    console.log("deactivated hook")
  },
  errorCapturedU() {
    console.log("error captured hook")
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentYear']),
    currentYr: function() {
      console.log("get current year " + this.currentYear + " " + this.selectedYear)
      if (this.currentYear != 0) {
        return this.currentYear
      } else {
        return this.selectedYear
      }
    }
  },
  components: {
    WeekItem,
    Logo
  },
  methods: {
    runit: function() {
    }
  },
  created() {
    console.log("created")
  },
  mounted() {
    console.log("mounted year")
    console.log(this.currentYr)
//    console.log(this.weeks)
//    console.log(this.isAuthenticated)
//    console.log("current year is " + this.currentYear)
  },
  data: function() {
    return {
      allWeeks: [],
      allYears: [],
      selectedYear: 0
    }
  },
  fetch(context) {
    console.log("fetch")
  },
//  asyncData(context) {
//    console.log("setting up async data")
//    return {
//      selectedYear: 0
//    }
//  },
  apollo: {
    weeks: {
//      prefetch: true,
      query: weeks,
      variables() {
        console.log("apollo variables...")
        return { year: this.currentYear != 0 ? this.currentYear : this.selectedYear }

//        return {
//          year: this.selectedYear
//        }
      },
      update(data) {
        console.log("update weeks")
        if (this.selectedYear == 0) {
          console.log("update selected year")
          this.selectedYear = data.weeks[0].date.split("-")[0]
          this.$store.commit('setCurrentYear', data.weeks[0].date.split("-")[0])
          console.log("Current year has been set in store to:")
          console.log(this.currentYear)
        }
        return data.weeks
      }
    },
    allYears: {
      query: years,
      update: function(data) {
        console.log("update years")
        return data.allYears
      }
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

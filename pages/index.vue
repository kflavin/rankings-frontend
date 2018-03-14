<template>
  <div>
    <div>
      <h1>Weekly Rankings</h1>
      <select class="dropdown" v-model="currentYr">
        <option v-for="year in allYears" :key="year">{{year}}</option>
      </select>
    </div>
    <div>
      <table class="table">
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
          :currentYear="currentYear"
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
import axios from 'axios'

export default {
//   updated() {
//     console.log("updated hook")
// //    this.$store.commit('setCurrentYear', this.selectedYear)
//   },
//   beforeUpdate() {
//     console.log("before update hook")
//   },
//   beforeMount() {
//     console.log("before mount hook")
//   },
//   activated() {
//     console.log("activated hook")
//   },
//   deactivated() {
//     console.log("deactivated hook")
//   },
//   errorCapturedU() {
//     console.log("error captured hook")
//   },
  computed: {
    ...mapGetters(['isAuthenticated', 'currentYear', 'getRoleId', 'getRole', 'getUser']),
    currentYr: {
      get: function() {
        // console.log("get current year " + this.currentYear + " " + this.selectedYear)
        return this.currentYear
      },
      set: function(val) {
        // console.log("currentYr setter, year=" + val)
        this.$store.commit('setCurrentYear', val)
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
  // created() {
  //   console.log("created index")
  //   console.log("The role id is: " + this.getRoleId)
  //   console.log("The other role id is: " + this.getRole)
  //   console.log(this.getUser)
  // },
  // mounted() {
  //   console.log("mounted year")
  //   console.log(this.currentYr)
  // },
  data: function() {
    return {
      allWeeks: [],
      allYears: [],
    }
  },
  fetch(context) {
    console.log("fetch")
    axios.get("http://localhost:5000/status/").then(function(res) {
        if (context.isServer) {
          console.log("fetching data on server")
          // console.log(res.data)

        } else {
          console.log("fetching data on the client")
          // console.log(res.data)
        }
    })

  },
 asyncData(context) {
   console.log("setting up async data")
   return {
     selectedYear: 0
   }
 },
  apollo: {
    weeks: {
//      prefetch: true,
      query: weeks,
      variables() {
        // console.log("apollo variables.  year=" + this.currentYear)
        return {year: this.currentYear}
      },
      update(data) {
        // console.log("update weeks yr=" + this.currentYr)
        // console.log(data)
        // If the year hasn't been set in app state, then set it now from the server response.
        if (this.currentYr == 0) {
          this.currentYr = data.weeks[0].date.split("-")[0]
        }
        return data.weeks
      }
    },
    allYears: {
      query: years,
      update: function(data) {
        // console.log("update years")
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
.dropdown {
  width: unset;
}
</style>

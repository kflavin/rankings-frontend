<template>
  <div>
    <nav-bar></nav-bar>
    <div>
      <h1>New Submission for week {{week.date}}</h1>
    </div>
    <div>
      <submit-item
      v-for="rank in this.positions"
      :rank="rank"
      :key="rank"
      :selections="selections"
      :items="teams">
      </submit-item>
      <button @click="validate">Submit</button>
      <button @click="reset">Reset</button>
    </div>

    <div>
      <br/>
      <router-link to="/">Weeks Index</router-link>
    </div>
  </div>
</template>

<script>
  import allTeams from '@/apollo/queries/allTeams'
  import currentWeek from '@/apollo/queries/currentWeek'
  import SubmitItem from '@/components/SubmitItem'
  import NavBar from '~/components/NavBar'

  export default {
    components: {
      SubmitItem,
      NavBar
    },
    middleware: 'auth',
    methods: {
      validate() {
        console.log("validating")
        var selections = this.$store.state.selections
        console.log(selections)
        if (selections.length !== this.positions) {
          alert("Invalid number of entries")
        } else {
          alert("submitted!")
        }
      },
      reset() {
        this.query = ''
      },
      select(item) {
        this.query = item
      }
    },
    props: {
      startAt: {
        type: Number,
        default: 3
      },
      positions: {
        type: Number,
        default: 10
      }
    },
    computed: {
      filtered() {
        if(this.query.length >= this.startAt) {
          return this.items.filter(item => {
            return item.toLowerCase().indexOf(this.query.toLowerCase()) > -1 && this.query.length < item.length
          })

        }
      },
      isEmpty() {
        if (typeof this.filtered === 'undefined') {
          return false
        } else {
          return this.filtered.length < 1
        }
      }
    },
    created: function() {
      this.$store.commit('clearSelections');
    },
    data: function() {
      return {
        teams: [],
        items: ["abcdef", "abcasdfasdf", "abcmadfmasdfn"],
        query: '',
        selections: []
      }
    },
    apollo: {
      teams: {
        query: allTeams,
        update: function(data) {
          this.$store.commit('setTeams', data.teams);
          return data.teams;
        }
      },
      week: {
        query: currentWeek,
        update: function(data) {
          return data.currentWeek
        }
      } 
    }
  }
</script>

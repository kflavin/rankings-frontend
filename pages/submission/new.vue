<template>
  <div>
    <div>
      <h1>New Submission for week ...</h1>
    </div>
    <div>
      <submit-item
      v-for="rank in teams.length"
      :rank="rank"
      :key="rank"
      :selections="selections"
      v-on:updateselection="setSelection">
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
    methods: {
      reset() {
        this.query = ''
      },
      select(item) {
//        console.log("selected!")
//        console.log(e.currentTarget)
        this.query = item
      },
      setSelection(item) {
        console.log("setting event selection")
        this.selections.push(item)
        console.log(this.selections)
      }
    },
    props: {
      startAt: {
        type: Number,
        default: 3
      }
    },
    computed: {
      filtered() {
        if(this.query.length >= this.startAt) {

          return this.items.filter(item => {
            return item.toLowerCase().indexOf(this.query.toLowerCase()) > -1 && this.query.length < item.length

//            if (item.hasOwnProperty(this.filterKey)) {
//              return item[this.filterKey].toLowerCase().indexOf(this.query.toLowerCase()) > -1
//
//            } else {
//              console.error("Seems like property ${this.filterKey} doesn't exist on object! ")
//            }
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
    data: function() {
      return {
        teams: [],
//        items: ["abcdef", "abcasdf", "abcwzzfsa"],
        items: ["abcdef", "abcasdfasdf", "abcmadfmasdfn"],
        query: '',
        selections: []
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

<template>
  <div>
    <div style="float: left; padding-right: 7px;">{{rank}}: <input type="text" ref="input" v-model="query"
                                                                   @click="displayList=true"
                                                                   @keyup="displayList=true"
                                                                   @blur="onBlur($event)"></div>
    <div style="color: red;" ref="message">{{message}}</div>
    <div style="clear: both"></div>
    <div>

      <div v-show="displayList">
        <transition-group name="fade" tag="ul" class="Results">
          <li v-for="item in filtered" :key="item.name" @mousedown.stop.prevent="onClick(item.name, $event)">
            <span>{{item.name}}</span>
          </li>
        </transition-group>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      rank: {
        type: Number,
        required: true
      },
      startAt: {
        type: Number,
        default: 2
      },
      teams: {
        type: Array,
        default: []
      },
      selections: {
        type: Array,
        default: []
      }
    },
    computed: {
      filtered() {
        if (this.query.length >= this.startAt) {
          var teams = this.teams.filter(team => {
            var teamName = team.name
//            return teamName.toLowerCase().indexOf(this.query.toLowerCase()) > -1
            return teamName.toLowerCase().startsWith(this.query.toLowerCase())
              && this.query.length < teamName.length
              && !this.selections.includes(teamName.toLowerCase())
              && this.displayList
          })

          return teams

        }
      }
    },
    data () {
      return {
        query: '',
        persistedQuery: '',
        displayList: false,
        message: ""
      }
    },
    created: function() {
      this.$emit('initSelections')
      console.log("Selections empty: " + this.selections)
    },
    methods: {
      reset () {
        this.query = ''
      },
      onClick(selection, e) {
        console.log("onClick")
        this.displayList = false
        this.query = selection.toLowerCase()
        this.persistedQuery = selection

        if (this.selections.includes(selection)) {
          this.message = `You already used ${selection}`
        } else {
          this.$emit('addteam', selection)
          this.query = selection
        }
        console.log(this.selections)
      },
      onBlur(e) {
        console.log("onBlur")
        this.displayList=false
        var selection = this.query

        // Not implemented yet
//        selection = this.teams.filter(team => {
//          return team.name.toLowerCase().startsWith(this.query.toLowerCase())
//        })
//
//        if (selection.length > 0) {
//          selection = selection[0].name
//        } else {
//          selection = this.query
//        }

        // Remove the old team, if one was given.
        if (this.persistedQuery != '') {
          this.$emit('removeteam', this.persistedQuery)
        }

        var team = this.teams.find((team) => {
          return team.name.toLowerCase() == selection.toLowerCase()
        })

        // If the team exists, add them.
        if (team != null) {
          this.query = this.persistedQuery = team.name
          this.$emit('addteam', team.name)
        } else {
          this.persistedQuery = ''
        }
        console.log(this.selections)
      }
    }
  }
</script>


<style>
.Results {
  position: absolute;
  background-color: white;
  cursor: pointer;
}
  .overlay {
    position: fixed; /* Sit on top of the page content */
    width: 10px; /* Full width (cover the whole page) */
    height: 10px; /* Full height (cover the whole page) */
    top: 10%;
    left: 10%;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
  }
</style>

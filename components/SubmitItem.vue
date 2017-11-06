<template>
  <div>
    <div style="float: left">{{rank}}: <input type="text" ref="input" v-model="query" @blur="onBlur"></div>
    <div></div>
    <div style="clear: both"></div>
    <div>

      <div v-show="displayList">
        <transition-group name="fade" tag="ul" class="Results">
          <li v-for="item in filtered" :key="item.name" @mousedown.stop.prevent="onClick(item.name)">
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
      items: {
        type: Array,
        required: true
      },
      rank: {
        type: Number,
        required: true
      },
      startAt: {
        type: Number,
        default: 2
      },
      selections: {
        type: Array,
        default: []
      }
    },
    computed: {
      filtered() {
        if (this.query.length >= this.startAt) {
          var items = this.items.filter(item => {
            var teamName = item.name
            return teamName.toLowerCase().indexOf(this.query.toLowerCase()) > -1 && this.query.length < teamName.length && !this.selections.includes(teamName)
          })

          if (items.length >= 1) {
            this.displayList = true
          }

          return items

        }
      }
    },
    data () {
      return {
        query: '',
        displayList: false,
      }
    },
    methods: {
      reset () {
        this.query = ''
      },
      onClick(selection) {
        this.query = selection.toLowerCase()

        if (this.$store.state.selections.contains(selection)) {
          // selection already exists
        }
        this.$store.commit('addSelection', selection)
        this.query = selection
      },
      onBlur() {
        this.displayList=false
        var selection = this.$refs.input.value
        var selections = this.$store.state.selections

        var team = this.items.find((item) => {
          return item.name.toLowerCase() == selection.toLowerCase()
        })

        if (team != null) {
          this.query = team.name
          this.$store.commit('addSelection', team.name)
        }
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

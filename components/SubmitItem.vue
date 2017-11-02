<template>
  <div>
    <div>{{rank}}: <input type="text" v-model="query" @blur.prevent="displayList=false"></div>
    <div>

      <div v-show="displayList">
        <transition-group name="fade" tag="ul" class="Results">
          <li v-for="item in filtered" :key="item" @mousedown="choose(item)">
            <span>{{item}}</span>
          </li>
        </transition-group>
      </div>


    </div>

  </div>
</template>

<script>
  export default {
    props: {
      team: '',
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
        console.log("filtering")
        console.log(this.query)
        console.log(this.selections)
        if (this.query.length >= this.startAt) {
          var items = this.items.filter(item => {
            return item.toLowerCase().indexOf(this.query.toLowerCase()) > -1 && this.query.length < item.length && !this.selections.includes(item)
          })

          if (items.length >= 1) {
            this.displayList = true
          }

          return items

        }
      }
//      filtered() {
//        console.log("filtering")
//        console.log(this.query)
//        this.displayList = true
//        if(this.query.length >= this.startAt) {
//
//          return this.items.filter(item => {
//            return item.toLowerCase().indexOf(this.query.toLowerCase()) > -1 && this.query.length < item.length
//          })
//
//        }
//        console.log("....")
//      },
    },
    data () {
      return {
        query: '',
        displayList: false,
        items: ["abcdef", "abcasdfasdf", "abcmadfmasdfn"],
      }
    },
//    watch: {
//      selection() {
//        console.log("selection updated!")
//        console.log(this.selection)
//      }
//    },
    methods: {
      reset () {
        this.query = ''
      },
      choose(item) {
        console.log("item chosen")
        this.query = item
        this.$emit('updateselection', item)
      }
    }
  }
</script>


<style>
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

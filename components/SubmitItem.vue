<template>
  <div>{{rank}}: <input type="text" @keyup="hello"></div>
</template>

<script>
  export default {
    props: {
      team: "",
      rank: 0
    },
    created: function() {
      console.log(this.$store.state.teams)
    },
    methods: {
      hello: function() {
        console.log("hello")
      }
    }
  }
</script>

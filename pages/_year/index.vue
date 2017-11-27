<template>
  <div>
    year
  </div>
</template>

<script>
  export default {
    created: function() {
      console.log("created!" + this.$route.params.year)
      console.log(this.$route)
      console.log(this.$router)
    }
  }
</script>

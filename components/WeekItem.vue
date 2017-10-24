<template>
  <div>Week number: <router-link :to="`week/${week.id}`">{{week.id}} {{week.date}}</router-link></div>
</template>

<script>

export default {
  name: 'WeekItem',
  props: ['week'],
  created: function() {
    console.log("created")
    console.log(this.week)
  }
}

</script>

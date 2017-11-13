<template>
  <div>Week {{week.id}}: <nuxt-link :to="`week/${week.id}`">{{week.date}}</nuxt-link></div>
</template>

<script>

export default {
  name: 'WeekItem',
  props: ['week'],
  created: function() {
  }
}

</script>

<template>
  <div>
    Week {{week.id}}: <nuxt-link :to="`week/${week.id}`">{{week.date}} Submissions</nuxt-link>
    -
    <nuxt-link :to="`week/${week.id}/ranking`" :week="week">Rankings</nuxt-link>
  </div>
</template>

<script>

export default {
  name: 'WeekItem',
  props: ['week'],
  created: function() {
  }
}

</script>

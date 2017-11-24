<template>
  <tr>
    <td>
      <b>{{date}}</b>
    </td>
    <td>
      <nuxt-link :to="`week/${week.id}`" class="button is-small is-info is-outlined">Week {{week.id}}</nuxt-link>
    </td>
    <td>
      <nuxt-link :to="`week/${week.id}/ranking`" :week="week" class="button is-small is-link is-outlined">Week {{week.id}}</nuxt-link>

    </td>
  </tr>
</template>

<script>

export default {
  name: 'WeekItem',
  props: ['week'],
  created: function() {
  },
  computed: {
    date() {
      return this.week.date.split("-").splice(1).join("-")
    }
},
  mounted: function() {
    console.log("WEEK")
    console.log(this.week)
  }
}

</script>

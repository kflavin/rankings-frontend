<template>
  <tr>
    <td>
      <b>{{week.date}}</b>
    </td>
    <td>
      <nuxt-link :to="`week/${week.id}`" class="button is-info is-outlined">Week {{week.id}}</nuxt-link>
    </td>
    <td>
      <nuxt-link :to="`week/${week.id}/ranking`" :week="week" class="button is-link is-outlined">Week {{week.id}}</nuxt-link>

    </td>
  </tr>
</template>

<script>

export default {
  name: 'WeekItem',
  props: ['week'],
  created: function() {
  }
}

</script>

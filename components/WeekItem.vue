<template>
  <tr>
    <td>
      <b>{{date}}</b>
    </td>
    <td>
      <nuxt-link 
      :to="`${currentYear}/week/${week.num}`" 
      :class="['button', week.active ? 'is-info':'is-outlined', 'is-small', 'is-outlined']">Week {{week.num}}</nuxt-link>
    </td>
    <td>
      <nuxt-link 
      :to="`${currentYear}/week/${week.num}/ranking`" 
      :week="week" :class="['button', {'is-info': week.active}, 'is-small', 'is-outlined']">Week {{week.num}}</nuxt-link>

    </td>
  </tr>
</template>

<script>

export default {
  name: 'WeekItem',
  props: ['week', 'currentYear'],
  created: function() {
    // console.log(this.week)
  },
  computed: {
    isDisabled() {
      console.log("Week num: " +this.week.num + " " + this.week.active)
      return !this.week.active
    },
    date() {
      return this.week.date.split("-").splice(1).join("-") + ( this.week.last ? "*" : "" )
    }
},
  mounted: function() {
//    console.log("WEEK")
//    console.log(this.week)
  }
}

</script>

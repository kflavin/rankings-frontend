<template>
  <div>
    <h1>Rankings for week: {{week.id}}</h1>

    <p><nuxt-link :to="`/`">Return to week's index</nuxt-link></p>
  </div>
</template>

<script>
  export default {
    props: {
      week: {
        type: Object,
        default: () => {
          return {id: 1}
        }
      }
    }
  }
</script>

<style>
</style>

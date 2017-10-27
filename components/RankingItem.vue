<template>
  <div>
    Position: {{ranking.position}}, Team: {{ranking.team.name}}
  </div>
</template>

<script>

  export default {
    props: ['ranking']
  }
</script>

<template>

  <div><router-link :to="`/submission/${submission.id}`">User: {{submission.user.name}}</router-link></div>
</template>

<script>

  export default {
    name: 'SubmissionItem',
    props: ['submission'],
    created: function() {
    }
  }

</script>

<template>

  <div><router-link :to="`/${currentYear}/submission/${submission.user.name}/${weeknum}`">User: {{submission.user.name}}</router-link></div>
</template>

<script>

  export default {
    name: 'SubmissionItem',
    props: ['submission', 'currentYear', 'weeknum'],
    created: function() {
      console.log("submission-item created")
      console.log(this.submission)
    }
  }

</script>

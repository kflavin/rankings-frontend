<template>
  <div>
    <div>
      <div style="float: right; margin-right: 30%;" v-if="userId">
        <p>
          <router-link :to="{name: 'submission-new'}">Submit Rankings</router-link> | <a @click="logout" href="#">Logout</a>
        </p>
      </div>
      <div style="float: right; margin-right: 30%;" v-else><router-link :to="{name: 'auth-login'}">Log In</router-link></div>

    </div>
  </div>
</template>


<script>
  export default {
    name: 'NavBar',
    computed: {
      userId: function() {
        return this.$store.state.userId
      }
    },
    methods: {
      logout: function() {
        this.$store.commit('clearCurrentUser')
        localStorage.removeItem("RANKINGS_USERID")
        localStorage.removeItem("RANKINGS_TOKEN")
      }
    }
  }
</script>

<template>
  <div>
    <div>
      <div style="float: right; margin-right: 30%;" v-if="userId">
        <p>
          <span>Hello, {{this.$store.state.username}} | </span>
          <router-link v-show="!isSubmission" :to="{name: 'submission-new'}">Submit Rankings</router-link>
          <span v-show="!isSubmission"> | </span>
          <a @click="logout" href="#">Logout</a>
        </p>
      </div>
      <div style="float: right; margin-right: 30%;" v-else><router-link :to="{name: 'auth-login'}">Log In</router-link></div>
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex'
  import { destroyToken } from '@/utils/auth'

  export default {
    name: 'NavBar',
    created: function() {

    },
    mounted: function() {
    },
//    computed: mapGetters({isAuthenticated: 'isAuthenticated'}),

    computed: {
      ...mapGetters(['isAuthenticated']),
      userId: function() {
        return this.$store.state.userId
      },
      isSubmission: function() {
        return this.$route.name == 'submission-new'
      }
    },
    methods: {
      logout: function() {
        destroyToken(this.$store)
        this.$router.push({name: 'auth-login', query: {message: 'You have been logged out.'}})
      }
    }
  }
</script>

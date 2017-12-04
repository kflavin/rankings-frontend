<template>
    <nav class="navbar-menu is-active">

      <div class="navbar-start">
      </div>
      <div class="navbar-end">
        <div v-if="userId">
          <p>
            <span>Hello, {{this.$store.state.username}} | </span>
            <router-link v-show="!isSubmission" :to="{name: 'submission-new'}">Submit Rankings</router-link>
            <span v-show="!isSubmission"> | </span>
            <a @click="logout" href="#">Logout</a>
          </p>
        </div>

        <div v-else>
          <router-link :to="{name: 'auth-login'}">Log In</router-link>
        </div>
      </div>

    </nav>
</template>


<script>
  import { mapGetters } from 'vuex'
  import { destroyToken } from '@/utils/auth'
  import { getUserNameFromLocalStorage, getUserIdFromLocalStorage, getTokenFromLocalStorage } from '~/utils/auth'

  export default {
    name: 'NavBar',
    created: function(d) {
//      if (!isServer) {
//        const username = getUserNameFromLocalStorage()
//        const userid = getUserIdFromLocalStorage()
//
//        if (userid != null) {
//          console.log("We have a user!")
//          store.commit('setCurrentUserId', userid)
//          store.commit('setCurrentUserName', username)
//        }
//      }
    },
    mounted: function() {
      console.log("Setting up store in NavBar mounted hook")
        const username = getUserNameFromLocalStorage()
        const userid = getUserIdFromLocalStorage()
        const token = getTokenFromLocalStorage()

        if (userid != null) {
          this.$store.commit('setCurrentUserId', userid)
          this.$store.commit('setCurrentUserName', username)
          this.$store.commit('setToken', token)
        }
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

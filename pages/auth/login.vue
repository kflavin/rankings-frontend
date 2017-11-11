<template>
  <div>
    <div><h1>{{login ? "Login" : "Register"}}</h1></div>
    <div>
      <div v-show="message" class="message">
        {{message}}
      </div>
      <div v-if="!login">
        <label for="email">Email</label><input id="email" type="text" placeholder="email" v-model="email">
      </div>
      <div>
        <label for="user">User</label><input id="user" type="text" placeholder="username" v-model="user">
      </div>
      <div>
        <label for="password">Password</label><input id="password" type="password" placeholder="password" v-model="password">
      </div>
    </div>

    <div>
      <input id="login" type="button" :value="login ? 'Login' : 'Register'" @click="confirm()">
      <input id="toggle" type="button" :value="login ? 'Register for an account':'Login with your Account'" @click="login=!login">
    </div>
    <div>
      <br/>
      <router-link to="/">Weeks Index</router-link>
    </div>
  </div>
</template>

<script>

  import signInUser from '@/apollo/queries/auth/signInUser'
  import { setToken } from '@/utils/auth'
  import { mapGetters } from 'vuex'

  export default {
    created: function() {
      if (this.isAuthenticated) {
        this.$router.push({path: '/'})
      }
    },
    computed: mapGetters(['isAuthenticated']),
    data: function() {
      return {
        login: true,
        email: "",
        user: "",
        password: "",
        message: this.$route.query.message || ''
      }
    },
    methods: {
      confirm: function() {
        const { user, email, password } = this.$data;

        if (this.login) {
          this.$apollo.mutate({
            mutation: signInUser,
            variables: {
              username: this.user,
              password: this.password
            }
          }).then((result) => {
            const user = result.data.loginUser
            const id = result.data.loginUser.userid
            const token = result.data.loginUser.token
//            this.saveUser(id, token, this.user)

//            setToken(token, Date.now() + 14400000)
            setToken(user, this.user, Date.now() + 14400000)

            this.$router.push({path: '/'})
          }).catch(function(error) {
            console.error(error)
            this.message = "Invalid login."
          }.bind(this))
        } else {
        }
      },
//      saveUser: function(id, token, user) {
//        localStorage.setItem("RANKINGS_USERID", id)
//        localStorage.setItem("RANKINGS_TOKEN", token)
//        this.$store.commit('setCurrentUserId', id)
//        this.$store.commit('setCurrentUser', user)
//      }
    }
  }
</script>

<style>
  .message {
    color: red
  }
</style>

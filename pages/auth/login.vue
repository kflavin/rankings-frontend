<template>
  <div>
    <div class="columns">
      <div class="column">

      </div>
      <div class="column">
        <div>
          <h1>{{login ? "Login" : "Register"}}</h1>
        </div>
        <div v-show="message" class="message">
          {{message}}
        </div>

        <div class="field" v-if="!login">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" v-model="email">
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="user" placeholder="User" v-model="user">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input class="input" type="password" placeholder="Password" v-model="password">
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button is-success" id="login" @click="confirm()">
              {{login ? 'Login' : 'Register'}}
            </button>
          </p>
          <p class="control">
            <button class="button  is-outlined" id="toggle" @click="login=!login">
              {{login ? 'Register for an account':'Login with your Account'}}
            </button>
          </p>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <br/>
          <router-link to="/">Weekly Rankings Home</router-link>
        </div>
      </div>

      <div class="column">

      </div>
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

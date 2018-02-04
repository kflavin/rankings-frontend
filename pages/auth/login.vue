<template>
  <div>
    <div class="columns">
      <div class="column">

      </div>
      <div class="column">
        <div>
          <h1>{{login ? "Login" : "Register"}}</h1>
        </div>
        <div v-show="message" class="msg">
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
            <input :class="['input', {'is-danger': error}]" @click="error=false; message = ''" type="user" placeholder="User" v-model="user">
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left">
            <input :class="['input', {'is-danger': error}]" @click="error=false; message=''" type="password" placeholder="Password" v-model="password">
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
            <button class="button is-success is-outlined" id="toggle" @click="login=!login">
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
  import createUser from '@/apollo/queries/auth/createUser'
  import { setToken } from '@/utils/auth'
  import { mapGetters } from 'vuex'

  export default {
    mounted: function() {
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
        message: this.$route.query.message || '',
        error: false
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
            console.log(error.message)
            if (error.message.match("Invalid User")) {
              this.message = "Invalid User"
            } else if (error.message.match("Please activate your account")) {
              this.message = "Please activate your account!"
            } else {
              this.message = "Invalid login."
            }
            this.error = true
          }.bind(this))
        } else {
          this.$apollo.mutate({
            mutation: createUser,
            variables: {
              email: this.email,
              name: this.user,
              password: this.password,
            }
          }).then((result) => {
            this.$router.push({name: 'auth-login', query: {message: "Please login!"}})
          }).catch(function(error) {
            console.log(error.message)
            if(error.message == "GraphQL error: User already exists.") {
              this.message = "User already exists."
            } else {
              this.message = "Error registering.  Please try again later."
            }
            this.error = true
          }.bind(this))
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
  .msg {
    color: red;
    padding-bottom: 10px;
  }
</style>

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
  import { mapGetters, mapMutations } from 'vuex'
  import axios from '~/plugins/axios'
  import cookie from 'js-cookie'

  export default {
    mounted: function() {
      if (this.isAuthenticated) {
        this.$router.push({path: '/'})
      }
    },
    created: function() {
      console.log("Login page created")
    },
    computed: mapGetters(['isAuthenticated', 'getRoleId']),
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
    fetch({isServer}) {
      if (isServer) {
        console.log("fetch from the server")
      } else {
        console.log("fetch from the client")
      }
    },
    asyncData(ctx) {
      console.log("asyncData hook")
      // console.log(req)
      // console.log(res)
    },
    methods: {
      ...mapMutations(['setRoleId', 'setUser']),
      confirm: function() {
        const { user, email, password } = this.$data;

        if (this.login) {
          this.$apollo.mutate({
            mutation: signInUser,
            variables: {
              username: this.user,
              password: this.password
            },
            update: (store, data) => {
              // console.log("UPDATING FOLLOWING LOGIN")
              // console.log(store)
              // console.log(data)
              // // store.state('setRole', 52)
              // console.log(this.$store)
              // this.$store.commit('setRole', 52)
              this.setUser(data.data.loginUser)
            }
          }).then((result) => {
            console.log("LOGGED IN AS ")
            console.log(result.data)
            const user = result.data.loginUser
            const id = result.data.loginUser.userid
            const token = result.data.loginUser.token
            const roleid = result.data.loginUser.roleid

            // var status = axios.get("http://localhost:5000/status/").then(function(res) {
            //   console.log("status is")
            //   console.log(res)
            // })

            // console.log("Setting role id " + roleid)
            // this.setRoleId(roleid)
            // console.log("Getting role id " + this.getRoleId)

//            this.saveUser(id, token, this.user)

            //setToken(token, Date.now() + 14400000)
            this.$store.dispatch('login', user).then(() => { console.log('User has been logged in!')})
            // cookie.set("rankings2", "test2")
            // sessionStorage.setItem("rankings3", "test3")

            this.$router.push({path: '/'})
          }).catch(function(error) {
            // console.log(error.message)
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
            // console.log(error.message)
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

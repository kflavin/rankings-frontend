<template>
<div>
    <p v-show="error">{{message}}</p>
</div>
</template>

<script>
import confirmUser from '@/apollo/queries/auth/confirmUser'

export default {
    name: "confirm",
    created: function() {
        var token = this.$route.query.token
        var email = this.$route.query.email
        
        if (!this.$isServer) {
            if (token && email) {
                console.log("we have a token and email")
                this.$apollo.mutate({
                    mutation: confirmUser,
                    variables: {
                        email: email,
                        token: token
                    }
                }).then((result) => {
                    console.log("success!")
                    const user = result.data.confirmUser
                    const id = result.data.confirmUser.id
                    const name = result.data.confirmUser.name
                    // const token = result.data.confirmUser.confirmation_token
                    this.$router.push({path: '/'})
                }).catch(function(error) {
                    console.log("failure")
                    console.log(error.message)
                    if (error.message.match("Invalid User")) {
                        this.message = "Invalid User"
                    } else if (error.message.match("Please activate your account")) {
                       this.message = "Please activate your account!"
                    } else {
                        this.message = "Confirmation error."
                    }
                    this.error = true
                }.bind(this))
                console.log("exiting...")

            } else {
                console.log("Token or email not provided")

            }
        }
    },
    data: function() {
        return {
            message: "",
            error: false
        }
    }
}


// export default {
//     name: "confirm",
//     created: function() {
//       var id = this.$route.params.id;
//       console.log(`Your query token is ${this.$route.query.code}`);
//       var url = `${process.env.API}${process.env.CONFIRM_REG}/${id}?code=${this.$route.query.code}`;
//       console.log("Getting URL " + url);
//       this.$http.get(url).then(function(res) {
//         console.log(res);
//       });
//       this.$router.push('/auth/login');
//       alertify.success("Registration confirmed!  Please login.");
//     }
//   }
</script>

<style>
</style>
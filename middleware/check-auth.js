import { getUserNameFromLocalStorage, getUserIdFromLocalStorage, getTokenFromLocalStorage } from '~/utils/auth'
import teams from '~/apollo/queries/allTeams.gql'

export default function ({ store, req, app }) {
  if (process.server) {
    console.log('check-auth middleware on the server')
    // console.log(req)
    // console.log(store)
    store.commit('setOnServer', true)
  } else {
    console.log('check-auth middleware on the client')
    const username = getUserNameFromLocalStorage()
    const userid = getUserIdFromLocalStorage()
    const token = getTokenFromLocalStorage()

    store.commit('setCurrentUserId', userid)
    store.commit('setCurrentUserName', username)
    store.commit('setToken', token)
  }

  // console.log(app)
  // console.log('---------------------------------------------------------------APP')
  // console.log(Object.keys(app.apolloProvider.defaultClient))
  // app.apolloProvider.defaultClient.query({'query': teams}).then(function (res) {
  //   console.log('querying')
  //   console.log(res)
  // })

  // console.log(app.apolloProvider.mutate)

  // If nuxt generate, pass this middleware
  // if (isServer && !req) return
  //
  // console.log("checking...")
  // const user = isServer ? getUserFromCookie(req) : getUserFromLocalStorage()

  // if (!isServer) {
  //   const user = getUserFromLocalStorage()
  // } else {
  //   return
  // }
  //
  // console.log("user is: " + user)
  //

  // console.log("check-auth middleware")
  // console.log(user)
  // store.commit('setCurrentUserId', user)
}

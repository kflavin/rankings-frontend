import { getUserNameFromLocalStorage, getUserIdFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, req }) {

  if (!isServer) {
    const username = getUserNameFromLocalStorage()
    const userid = getUserIdFromLocalStorage()

    store.commit('setCurrentUserId', userid)
    store.commit('setCurrentUserName', username)
  }

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


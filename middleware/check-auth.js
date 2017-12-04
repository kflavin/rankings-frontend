import { getUserNameFromLocalStorage, getUserIdFromLocalStorage, getTokenFromLocalStorage } from '~/utils/auth'

export default function ({ isServer, store, req }) {
  console.log('check-auth middleware')

  if (isServer) {
    console.log('request, setOnServer ')
    // console.log(req)
    // console.log(store)
    console.log(req.headers)
    console.log(req.data)
    store.commit('setOnServer', true)
  }

  if (!isServer) {
    // console.log(req)
    console.log('setting store...')
    const username = getUserNameFromLocalStorage()
    const userid = getUserIdFromLocalStorage()
    const token = getTokenFromLocalStorage()

    store.commit('setCurrentUserId', userid)
    store.commit('setCurrentUserName', username)
    store.commit('setToken', token)
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

// can't mix import with module.exports
// https://github.com/webpack/webpack/issues/4039
// import Cookie from 'js-cookie'
// import jwtDecode from 'jwt-decode'

var Cookie = require('js-cookie')
var jwtDecode = require('jwt-decode')

var setToken = function (user, name, expiration) {
  const id = user.userid
  const token = user.token
  localStorage.setItem('authToken', token)
  localStorage.setItem('username', name)
  localStorage.setItem('userid', id)
  localStorage.setItem('authTokenExpiration', expiration)
  // localStorage.setItem('user', JSON.stringify(user))
  // Cookie.set('token', token)
  // Cookie.set('tokenExpiration', expiration)


  // localStorage.setItem("userid", id)
  // localStorage.setItem("token", token)


  // store.commit('setCurrentUserId', id)
  // store.commit('setCurrentUser', user)
  // store.commit('token', token)


}

var destroyToken = (store) => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('username')
  localStorage.removeItem('userid')
  localStorage.removeItem('authTokenExpiration')

  store.commit('clearCurrentUserId')
  store.commit('clearCurrentUserName')
  store.commit('clearCurrentUser')
}

var getTokenFromLocalStorage = function () {
  var token = localStorage.getItem('authToken')
  var expiration = localStorage.getItem('authTokenExpiration')

  if (!token || !expiration) {
    return null
  }

  if (Date.now() > parseInt(expiration)) {
    this.destroyToken()
    return null
  } else {
    return token
  }
}

var getUserFromLocalStorage = function () {
  var token = getTokenFromLocalStorage()

  if (!token) return
  return jwtDecode(token)
}

var getTokenFromCookie = function (req) {
  if (!req || !req.headers.cookie) return
  const authToken = req.headers.cookie.split(';').find(c => c.trim().startsWith('authToken='))
  if (!authToken) return
  const jwt = authToken.split('=')[1]
  return jwtDecode(jwt)
}

var getUserFromCookie = function () {
  var token = getTokenFromCookie()
  if (!token) return
  return jwtDecode(token)
}

var getUserNameFromLocalStorage = function () {
  return localStorage.getItem('username')
}

var getUserIdFromLocalStorage = function () {
  return localStorage.getItem('userid')
}

var loggedIn = function () {
  if (this.getToken()) {
    return true
  } else {
    return false
  }
}

module.exports = {
  setToken,
  destroyToken,
  getTokenFromLocalStorage,
  getTokenFromCookie,
  loggedIn,
  getUserFromLocalStorage,
  getUserFromCookie,
  getUserNameFromLocalStorage,
  getUserIdFromLocalStorage
}

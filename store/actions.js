import cookie from 'js-cookie'
import refreshUser from '@/apollo/queries/auth/refreshUser'

export const actions = {
  async nuxtServerInit ({commit}, ctx) {
    console.log('===================================nuxtServerInit')
    var arr = ctx.req.headers.cookie.split(';')
    var cookies = {}
    arr.forEach(function (el) {
      var [k, v] = el.trim().split('=')
      cookies[k] = v
    })

    await ctx.app.apolloProvider.defaultClient.mutate({
      mutation: refreshUser,
      variables: {
        token: cookies.rankings
      },
      update: (store, { data: { refreshUser } }) => {
        commit('setUser', refreshUser)
      }
    })
  },
  login ({commit, req, isServer}, user) {
    console.log('Action: Login user')
    // commit('setUser', {username: user.username, userid: user.userid, roleid: user.roleid, token: user.token})
    commit('setUser', user)
    // cookie.set('rankingsblah', user.token, {expires: Date.now() + 14400000})
    cookie.set('rankings', user.token, {expires: 3})
    // setToken(user, this.user, Date.now() + 14400000)
  },
  logout ({commit}) {
    console.log('Action: Logging out user')
    commit('deleteUser')
    cookie.remove('rankings')
  }
}

export default actions

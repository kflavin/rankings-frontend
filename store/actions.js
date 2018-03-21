import cookie from 'js-cookie'
import refreshUser from '@/apollo/queries/auth/refreshUser'
import { getCookies } from '@/utils/helpers'

export const actions = {
  async nuxtServerInit ({commit}, ctx) {
    console.log('===================================nuxtServerInit')
    // var arr = ctx.req.headers.cookie.split(';')
    // var cookies = {}
    // arr.forEach(function (el) {
    //   var [k, v] = el.trim().split('=')
    //   cookies[k] = v
    // })

    var cookies = getCookies(ctx.req.headers.cookie)
    console.log('yer cookies')
    console.log(cookies)

    if (cookies.rankings) {
      var result = await ctx.app.apolloProvider.defaultClient.mutate({
        mutation: refreshUser,
        variables: {
          token: cookies.rankings
        },
        update: (store, { data: { refreshUser } }) => {
          console.log('Set the user')
          console.log(refreshUser)
          commit('setUser', refreshUser)
        }
      // }).then(function (data) {
      //   console.log(data)
      }).catch(function (error) {
        console.log('problem in nuxtserverinit mutation')
        error.networkError.result.errors.forEach(err => {
          console.log(err)
        })
        // console.log(Object.keys(error.networkError.response.body))
        // console.log(error.networkError.response.body)
        // console.log('ok?:' + error.networkError.response.ok)
        // console.log(Object.keys(error))
        // console.log(error.networkError.result.errors[0])
      })
    } else {
      console.log('no cookie is set')
    }
    console.log('nuxtserverinit result')
    console.log(result)
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

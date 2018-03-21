export const getCookies = (cookie) => {
  var arr = cookie.split(';')

  var cookies = {}
  arr.forEach(function (el) {
    var [k, v] = el.trim().split('=')
    cookies[k] = v
  })
  return cookies
}

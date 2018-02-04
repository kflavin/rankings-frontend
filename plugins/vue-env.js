// import Vue from 'vue'

export default ({ beforeNuxtRender, nuxtState, env }) => {
  if (process.server) {
    console.log('PLUGIN BEING PROCESSED ON THE SERVER')
    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.env = nuxtState.env || {}
      Object.keys(env).forEach(key => {
        if (process.env[key]) {
          nuxtState.env[key] = process.env[key]
        }
      })
    })
  } else {
    console.log('THE PLUGIN IS PROCSSED ON THE CLIENT')
    Object.keys(nuxtState.env).forEach(key => {
      env[key] = nuxtState.env[key]
    })
  }
}

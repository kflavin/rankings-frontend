// import Vue from 'vue'

export default ({ beforeNuxtRender, nuxtState, env }) => {
  if (process.server) {
    console.log('PLUGIN BEING PROCESSED ON THE SERVER')
    console.log(nuxtState)
    console.log(env)
    beforeNuxtRender(({ nuxtState }) => {
      console.log('beforeNuxtRender')
      nuxtState.env = nuxtState.env || {}
      Object.keys(env).forEach(key => {
        console.log('Processing keys: ' + key)
        if (process.env[key]) {
          nuxtState.env[key] = process.env[key]
        }
      })
    })
  } else {
    console.log('THE PLUGIN IS PROCSSED ON THE CLIENT')
    console.log(nuxtState)
    console.log(env)
    Object.keys(nuxtState.env).forEach(key => {
      console.log('Processing keys: ' + key)
      env[key] = nuxtState.env[key]
    })
  }
}

console.log('Hello from the plugin!')

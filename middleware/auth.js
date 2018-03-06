// export default function ({store, error}) {
export default function (context) {
  if (context.isClient) {
    console.log('processing middleware on the client')
    // var ROOT_QUERY = context.nuxtState.apollo.defaultClient.ROOT_QUERY
    // console.log(context)
    // console.log(window.__NUXT__)
    // if ('mySubmission' in ROOT_QUERY) {
    //   console.log("DELETING YOUR SUBMISSION")
    //   delete ROOT_QUERY.mySubmission
    // } else {
    // }
  } else {
    console.log('Processing middleware on the server')
  }
  // console.log(context.nuxtState.apollo.defaultClient.ROOT_QUERY.mySubmission)
  if (context.store.state.userId === 0) {
    console.log('You are not logged in')
    // context.error({message: 'You are not logged in', statusCode: 403})
    context.redirect(302, '/auth/login', {message: 'Please login.'})
  } else {
    console.log('You are logged in')
  }
}

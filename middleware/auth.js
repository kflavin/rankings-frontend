// export default function ({store, error}) {
export default function (context) {
  console.log('middleware function...')
  if (context.store.state.userId === 0) {
    console.log('YOu are not logged in')
    // context.error({message: 'You are not logged in', statusCode: 403})
    context.redirect(302, '/auth/login', {message: 'Please login.'})
  } else {
    console.log('You are logged in')
  }
}

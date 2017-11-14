// import { createNetworkInterface } from 'apollo-client'
//
// export default (ctx) => {
//   const networkInterface = createNetworkInterface({
//     uri: 'http://127.0.0.1:5000/simple'
//     // uri: 'http://127.0.0.1:5000/graphql'
//   })
//
//   console.log("your context")
//   console.log(ctx)
//
//   // here you can place your middleware. ctx has the context forwarded from Nuxt
//
//   // you can return the networkInterface directly or return an object with additional
//   // apollo-client options
//   // return networkInterface
//
//   // alternative return a object with constructor options of apollo-client
//   // return {
//   //   networkInterface,
//   //   dataIdFromObject: o => o.id
//   // }
//   return networkInterface
// }


import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { getToken } from '@/utils/auth'



export default (ctx) => {

  var endpoint = ""
  if (process.env.NODE_ENV == "production") {
    endpoint = "https://rankings-backend.herokuapp.com/simple"
  } else {
    endpoint = "http://127.0.0.1:5000/simple"
  }

  const networkInterface = createNetworkInterface({ uri: endpoint });

  // if (ctx.isServer) {
  //   console.log("this is the server!")
  //   console.log(ctx.req.headers)
  // } else {
  //   console.log("this is the client!")
  //   console.log(ctx.req)
  // }

  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }

      if (ctx.isClient) {
        var token = localStorage.getItem('authToken');
        // var token = getToken()
        req.options.headers['Authorization'] = 'Bearer ' + token
        // req.options.headers['authorization'] = localStorage.getItem('token') ? localStorage.getItem('token') : null;
      } else {
      }



      next();
    }
  }]);

  return networkInterface
}

import { resolve } from 'path'
import Koa from 'koa'
import { ApolloServer, gql } from 'apollo-server-koa'
import R from 'ramda'
const MIDDLEWARES = ['database', 'common', 'router']

const r = path => resolve(__dirname, path)
async function startApolloServer() {
  
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!'
    }
  }

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  const app = new Koa()
  server.applyMiddleware({ app })
  // alternatively you can get a composed middleware from the apollo server
  // app.use(server.getMiddleware());
  useMiddleware(app)(MIDDLEWARES)
  await new Promise(resolve => app.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}

function useMiddleware(app) {
  return R.map(
    R.compose(
      R.map(i => i(app)),
      i => {
        console.log(i)
        return require(i)
      },
      i => {
        console.log(i)
        return `${r('./middleware')}/${i}`
      }
    )
  )
}
startApolloServer()
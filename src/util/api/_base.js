

const configDevelop = {
  baseUrl: 'http://localhost:3000/api',
  graphqlEndpoint: 'http://localhost:3000/graphql'
}

const configProduction = {
  baseUrl: 'https://vitaspider.com/api',
  graphqlEndpoint: 'https://vitaspider.com/graphql'
}

const config = process.env.NODE_ENV === 'production'? configProduction: configDevelop

export default configDevelop
import gql from 'graphql-tag'

export const ALL_WEEKS_QUERY = gql`
query {
  allWeeks {
    edges{
      node{
        id
        date
      }
    }
  }
}
`

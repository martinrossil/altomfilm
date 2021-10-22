import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
    }
    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }
`

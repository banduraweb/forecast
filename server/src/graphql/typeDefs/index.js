import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Viewer {
        id: ID
        token: String
        avatar: String
        didRequest: Boolean!
    }

    input LogInInput {
        code: String!
    }

    type Query {
        authUrl: String!
    }

    type Mutation {
        logIn(input: LogInInput): Viewer!
        logOut: Viewer!
    }
`;

import { GraphQLClient } from 'graphql-request';

const gqlClient = new GraphQLClient(`${process?.env?.GQL_ENDPOINT}`);
export default gqlClient;

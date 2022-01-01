import { IGetContact } from '@/types';
import { gql } from 'graphql-request';
import gqlClient from './gqlClient';

export const getContact = async () => {
  const query = gql`
    {
      contact {
        data {
          attributes {
            linkedin
            instagram
            github
            codepen
            observablehq
            stackoverflow
            codesandbox
            publishedAt
          }
        }
      }
    }
  `;
  const req = await gqlClient.request<IGetContact>(query);
  return req?.contact?.data?.attributes;
};

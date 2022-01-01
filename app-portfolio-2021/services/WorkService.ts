import { IGetWorkResponse } from '@/types';
import { gql } from 'graphql-request';
import gqlClient from './gqlClient';

export const getWork = async () => {
  const query = gql`
    {
      work {
        data {
          attributes {
            content
          }
        }
      }
    }
  `;

  const result = await gqlClient.request<IGetWorkResponse>(query);
  return result?.work?.data?.attributes?.content ?? '';
};

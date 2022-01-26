import { ITags } from '@/types';
import { gql } from 'graphql-request';
import gqlClient from './gqlClient';

interface IGetTags {
  tags: ITags & {
    meta: {
      pagination: {
        total: number;
      };
    };
  };
}

export const getTags = async ({
  pageSize = 100,
}: { pageSize?: number } = {}) => {
  const query = gql`
    query getTags($pageSize: Int) {
      tags(pagination: { pageSize: $pageSize }) {
        data {
          attributes {
            key
            label
          }
        }
        meta {
          pagination {
            total
          }
        }
      }
    }
  `;

  const res = await gqlClient.request<IGetTags>(query, { pageSize });
  return res;
};

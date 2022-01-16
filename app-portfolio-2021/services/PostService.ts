import type { IGetPostResponse, ITags } from '@/types';
import {
  PostFiltersInput,
  PostInput,
  StringFilterInput,
  TagFiltersInput,
} from '@/types/graphql';
import { IPaginationResult } from '@/types/Pagination';
import { gql } from 'graphql-request';
import gqlClient from './gqlClient';

interface IGetPostIndex {
  attributes: Pick<PostInput, 'uid'>;
}

interface IGetPostIndices {
  posts: {
    data: IGetPostIndex[];
    meta: {
      pagination: IPaginationResult;
    };
  };
}

export const getPostIndices = async () => {
  const query = gql`
    query getPostsIndices($pageSize: Int, $filters: PostFiltersInput) {
      posts(pagination: { pageSize: $pageSize }, filters: $filters) {
        data {
          attributes {
            uid
          }
        }
        meta {
          pagination {
            total
            page
            pageSize
            pageCount
          }
        }
      }
    }
  `;
  interface Arg {
    pageSize: number;
    filters: PostFiltersInput;
  }
  const arg: Arg = {
    pageSize: 100,
    filters: {
      publishedAt: { notNull: true },
    },
  };
  const posts = await gqlClient.request<IGetPostIndices>(query, arg);
  return posts;
};

export const getPost = async (uid: string) => {
  const query = gql`
    query getPost($uid: StringFilterInput) {
      posts(filters: { uid: $uid }) {
        data {
          attributes {
            title
            content
            publishedAt
            tags {
              data {
                attributes {
                  label
                  key
                }
              }
            }
          }
        }
      }
    }
  `;
  const post = await gqlClient.request<IGetPostResponse>(query, {
    uid: { eq: uid },
  });
  const result = post?.posts?.data?.[0]?.attributes ?? null;
  return result;
};

interface IGetPostsArg {
  page?: number;
  pageSize?: number;
  tagKeys?: string[];
  keyword: string;
}

interface IGetPostsPost {
  attributes: {
    title: string;
    uid: string;
    publishedAt: string;
    tags: ITags;
  };
}

interface IGetPostsResponse {
  posts: {
    data: IGetPostsPost[];
    meta: {
      pagination: {
        total: number;
        page: number;
        pageSize: number;
        pageCount: number;
      };
    };
  };
}

interface IGetPostsFilter extends PostFiltersInput {}

// 나중에 meilisearch 로 업데이트할 것
export const getPosts = async ({
  page = 1,
  pageSize = 10,
  tagKeys = [],
  keyword = '',
}: IGetPostsArg) => {
  const query = gql`
    query getPosts($filters: PostFiltersInput, $page: Int, $pageSize: Int) {
      posts(
        filters: $filters
        pagination: { page: $page, pageSize: $pageSize }
      ) {
        data {
          attributes {
            title
            uid
            publishedAt
            tags {
              data {
                attributes {
                  key
                  label
                }
              }
            }
          }
        }
        meta {
          pagination {
            total
            page
            pageSize
            pageCount
          }
        }
      }
    }
  `;
  const filters: IGetPostsFilter = {};
  if (keyword !== '') filters.title = { containsi: keyword };

  if (tagKeys?.length >= 1)
    filters.tags = { and: tagKeys.map((tagKey) => ({ key: { eq: tagKey } })) };
  const posts = await gqlClient.request<IGetPostsResponse>(query, {
    filters,
    page,
    pageSize,
  });
  return posts?.posts;
};

interface ISearchPostArg {
  q: string;
}
export const searchPosts = async ({ q }: ISearchPostArg) => {};

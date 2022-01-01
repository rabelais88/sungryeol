import type { IGetPostResponse, ITags } from '@/types';
import { PostInput, StringFilterInput, TagFiltersInput } from '@/types/graphql';
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
    query getPosts($pageSize: Int) {
      posts(pagination: { pageSize: $pageSize }) {
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
  const posts = await gqlClient.request<IGetPostIndices>(query, {
    pageSize: 100,
  });
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
  };
}

interface IGetPostsFilter {
  title?: StringFilterInput;
  tags?: TagFiltersInput;
}

// 나중에 meilisearch 로 업데이트할 것
export const getPosts = async ({
  page = 0,
  pageSize = 10,
  tagKeys,
  keyword,
}: IGetPostsArg) => {
  const query = gql`
    query getPostsByTag(
      $filters: PostFiltersInput
      $page: Int
      $pageSize: Int
    ) {
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
      }
    }
  `;
  const filters: IGetPostsFilter = {};
  if (keyword !== '') filters.title = { containsi: keyword };
  if (tagKeys) filters.tags = { key: { and: tagKeys } };
  const posts = await gqlClient.request<IGetPostsResponse>(query, {
    filters,
    page,
    pageSize,
  });
  return posts?.posts?.data;
};

interface ISearchPostArg {
  q: string;
}
export const searchPosts = async ({ q }: ISearchPostArg) => {};

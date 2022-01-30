import type { IGetPostResponse, ITags } from '@/types';
import { PostFiltersInput, PostInput } from '@/types/graphql';
import { IPaginationResult } from '@/types/Pagination';
import { gql } from 'graphql-request';
import gqlClient from './gqlClient';

interface IGetPostIndex {
  attributes: Pick<PostInput, 'uid'>;
}

interface _IGetPostIndices {
  posts: {
    data: IGetPostIndex[];
    meta: {
      pagination: IPaginationResult;
    };
  };
}

export const getPostIndex = async (
  page: number = 1,
  pageSize: number = 100
) => {
  const query = gql`
    query getPostsIndices(
      $pageSize: Int
      $page: Int
      $filters: PostFiltersInput
    ) {
      posts(
        pagination: { pageSize: $pageSize, page: $page }
        filters: $filters
      ) {
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
    page: number;
    filters: PostFiltersInput;
  }
  const arg: Arg = {
    pageSize,
    page,
    filters: {
      publishedAt: { notNull: true },
    },
  };
  const posts = await gqlClient.request<_IGetPostIndices>(query, arg);
  return posts;
};

interface IGetPostIndices {
  postUids: string[];
  total: number;
}

export const getPostIndices = async (): Promise<IGetPostIndices> => {
  let isPageEnd: boolean = false;
  let postUids: string[] = [];
  let total = 0;
  for (let page = 1; !isPageEnd; ) {
    const postIndices = await getPostIndex(page);
    total = postIndices.posts.meta.pagination.total;
    postUids = [
      ...postUids,
      ...postIndices.posts.data.map((p) => `${p.attributes.uid}`),
    ];
    isPageEnd = postIndices.posts.meta.pagination.pageCount <= page + 1;
    page += 1;
  }
  return { postUids, total };
};

export const getPost = async (uid: string, preview?: boolean) => {
  const query = gql`
  query getPost($uid: StringFilterInput) {
    posts(filters: { uid: $uid }, publicationState: ${
      preview ? 'PREVIEW' : 'LIVE'
    }) {
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

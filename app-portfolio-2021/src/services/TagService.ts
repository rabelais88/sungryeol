import { IGetTagStatsResult, ITags } from '@/types';
import { IPaginationResult } from '@/types/Pagination';
import { gql } from 'graphql-request';
import gqlClient from './gqlClient';

interface IGetTagsResult {
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

  const res = await gqlClient.request<IGetTagsResult>(query, { pageSize });
  return res;
};

// const sampleData = {
//   data: {
//     tags: {
//       data: [
//         {
//           id: '1',
//           attributes: {
//             key: 'frontend',
//             label: 'frontend',
//             posts: {
//               data: [
//                 {
//                   attributes: {
//                     tags: {
//                       data: [
//                         {
//                           id: '1',
//                           attributes: {
//                             key: 'frontend',
//                             label: 'frontend',
//                           },
//                         },
//                         {
//                           id: '2',
//                           attributes: {
//                             key: 'sample-tag',
//                             label: 'sample-tag',
//                           },
//                         },
//                       ],
//                     },
//                   },
//                 },
//                 {
//                   attributes: {
//                     tags: {
//                       data: [
//                         {
//                           id: '1',
//                           attributes: {
//                             key: 'frontend',
//                             label: 'frontend',
//                           },
//                         },
//                       ],
//                     },
//                   },
//                 },
//                 {
//                   attributes: {
//                     tags: {
//                       data: [
//                         {
//                           id: '1',
//                           attributes: {
//                             key: 'frontend',
//                             label: 'frontend',
//                           },
//                         },
//                       ],
//                     },
//                   },
//                 },
//                 {
//                   attributes: {
//                     tags: {
//                       data: [
//                         {
//                           id: '1',
//                           attributes: {
//                             key: 'frontend',
//                             label: 'frontend',
//                           },
//                         },
//                       ],
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//         },
//         {
//           id: '2',
//           attributes: {
//             key: 'sample-tag',
//             label: 'sample-tag',
//             posts: {
//               data: [
//                 {
//                   attributes: {
//                     tags: {
//                       data: [
//                         {
//                           id: '1',
//                           attributes: {
//                             key: 'frontend',
//                             label: 'frontend',
//                           },
//                         },
//                         {
//                           id: '2',
//                           attributes: {
//                             key: 'sample-tag',
//                             label: 'sample-tag',
//                           },
//                         },
//                       ],
//                     },
//                   },
//                 },
//                 {
//                   attributes: {
//                     tags: {
//                       data: [
//                         {
//                           id: '2',
//                           attributes: {
//                             key: 'sample-tag',
//                             label: 'sample-tag',
//                           },
//                         },
//                       ],
//                     },
//                   },
//                 },
//               ],
//             },
//           },
//         },
//       ],
//       meta: {
//         pagination: {
//           page: 1,
//           total: 2,
//           pageSize: 10,
//           pageCount: 1,
//         },
//       },
//     },
//   },
// };

export const getTagStats = async ({
  pageSize = 100,
}: { pageSize?: number } = {}) => {
  const query = gql`
    query getTags($pageSize: Int, $page: Int, $tagPageSize: Int) {
      tags(pagination: { pageSize: $pageSize, page: $page }) {
        data {
          id
          attributes {
            key
            label
            posts {
              data {
                attributes {
                  tags(pagination: { pageSize: $tagPageSize }) {
                    data {
                      id
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
        }
        meta {
          pagination {
            page
            total
            pageSize
            pageCount
          }
        }
      }
    }
  `;
  const res = await gqlClient.request<IGetTagStatsResult>(query, {
    pageSize,
    page: 1,
    tagPageSize: pageSize,
  });
  return res;
};

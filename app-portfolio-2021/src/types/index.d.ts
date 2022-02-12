export interface ITag {
  attributes: {
    label: string;
    key: string;
  };
}
export interface ITags {
  data: ITag[];
}

export interface IGetPostResponse {
  posts: {
    data: [
      {
        attributes: Pick<PostInput, 'title' | 'content' | 'publishedAt'> & {
          tags: ITags;
        };
      }
    ];
  };
}

export type ReturnPromiseType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

export interface IGetWorkResponse {
  work: {
    data: {
      attributes: {
        content: string;
      };
    };
  };
}

export interface IGetContact {
  contact: {
    data: {
      attributes: {
        linkedin: string;
        instagram: string;
        github: string;
        codepen: string;
        observablehq: string;
        stackoverflow: string;
        codesandbox: string;
        publishedAt: string;
      };
    };
  };
}

export interface IPostHit {
  updatedAt: string;
  uid: string;
  content: string;
  tags: {
    createdAt: string;
    id: number;
    key: string;
    label: string;
    updatedAt: string;
  }[];
}

interface tagData {
  id: string;
  attributes: {
    key: string;
    label: string;
  };
}

interface tagDataWithPosts extends tagData {
  attributes: {
    key: string;
    label: string;
    posts: {
      data: {
        attributes: {
          tags: {
            data: tagData[];
          };
        };
      }[];
    };
  };
}

export interface IGetTagStatsResult {
  tags: {
    data: tagDataWithPosts[];
    meta: {
      pagination: IPaginationResult;
    };
  };
}

// do not use declare for using IDE in project root dir
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
        attributes: Pick<
          PostInput,
          'title' | 'content' | 'publishedAt' | 'dateOverride' | 'updatedAt'
        > & {
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
  dateOverride: string;
  uid: string;
  content: string;
  title: string;
  tags: {
    createdAt: string;
    id: number;
    key: string;
    label: string;
    updatedAt: string;
  }[];
}

export interface FrameGL {
  (time: number, delta: number): void;
}

// export type OptionalKeysOf<T> = {
//   [K in keyof T]: {} extends Pick<T, K> ? K : never;
// }[keyof T];

// export type OnlyOptionalKeysToRequired<T> = Required<
//   Pick<T, OptionalKeysOf<T>>
// >;

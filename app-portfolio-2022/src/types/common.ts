import { Post } from '.tina/__generated__/types';
import { NextPage } from 'next';

export type MyPage<T = any> = NextPage<PageProps & T> & {
  defaultProps?: PageProps;
};
export type PostHit = Post & {
  objectID: string;
  datePublish: string;
};

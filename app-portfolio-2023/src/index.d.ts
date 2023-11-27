declare interface PropsWithClass {
  className?: string;
}

declare type MyPageProps<
  Params extends string[],
  SearchParams extends string[] | undefined = undefined,
> = SearchParams extends undefined
  ? { params: Record<Params[number], string> }
  : {
      params: Record<Params[number], string>;
      searchParams: Record<SearchParams[number], string>;
    };

interface SearchablePost {
  title: string;
  visible: boolean;
  publishedAt: string;
  tags: string[];
  body: string;
}
interface SearchableWork {
  title: string;
  visible: boolean;
  publishedAt: string;
  publishedAtType: 'no-disclosure' | 'year-month' | 'year';
  urls: string[];
  body: string;
}

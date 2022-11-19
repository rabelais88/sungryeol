declare type PageLayout = React.FC<React.PropsWithChildren<{}>>;

declare interface PageProps {
  layout?: PageLayout;
  bodyPortal?: React.ReactNode;
  pageTitle?: string;
  pageDescription?: string;
  pageImage?: string;
  pageKeywords?: string[];
  forceTopBarHide?: boolean;
}

declare interface StoreContext {
  sideBarShow: boolean;
  setSideBarShow: React.Dispatch<React.SetStateAction<boolean>>;
  topBarShow: boolean;
  setTopBarShow: React.Dispatch<React.SetStateAction<boolean>>;
}

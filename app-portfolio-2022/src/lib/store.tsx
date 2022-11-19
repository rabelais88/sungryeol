import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

const Context = createContext<StoreContext>({
  topBarShow: true,
  sideBarShow: false,
} as StoreContext);

export const StoreProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [topBarShow, setTopBarShow] = useState(true);
  const [sideBarShow, setSideBarShow] = useState(false);
  return (
    <Context.Provider
      value={{ topBarShow, setTopBarShow, sideBarShow, setSideBarShow }}
    >
      {children}
    </Context.Provider>
  );
};

export function useStoreContext() {
  return useContext(Context);
}

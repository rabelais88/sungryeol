import { atom, useAtom } from 'jotai';

const atomNavOpen = atom(false);
export const useNavOpen = () => {
  const [navOpen, setNavOpen] = useAtom(atomNavOpen);
  return { navOpen, setNavOpen };
};

const atomNavShow = atom(true);
export const useNavShow = () => {
  const [navShow, setNavShow] = useAtom(atomNavShow);
  return { navShow, setNavShow };
};

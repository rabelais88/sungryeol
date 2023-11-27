'use client';

import { useNavOpen } from '@/utils/store';
import IconTextLogoEng from './icons/IconTextLogoEng';
import IconMenu from './icons/IconMenu';
import { DOMAttributes, PropsWithChildren } from 'react';
import { joinClass } from '@/utils';
import Link from 'next/link';
export type MenuButtonProps = PropsWithChildren &
  PropsWithClass &
  DOMAttributes<HTMLButtonElement>;
export const MenuButton = ({
  children,
  className,
  ...props
}: MenuButtonProps) => {
  return (
    <button
      className={joinClass(
        'text-black dark:text-white transition-colors',
        'hover:text-white hover:bg-black dark:hover:text-black dark:hover:bg-white',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const NavTop = () => {
  const { setNavOpen, navOpen } = useNavOpen();
  return (
    <nav data-comp="nav-top" className="sm:fixed top-0 inset-x-0 z-menu ">
      <div
        className={joinClass(
          'h-nav-top bg-yellow-base border-b border-black flex px-[10px]',
          'dark:border-b-0 dark:bg-pink-base'
        )}
      >
        <div data-role="left-side" className="flex items-center">
          <MenuButton className="h-full" onClick={() => setNavOpen(!navOpen)}>
            <IconMenu className="w-[32px] h-[32px]" />
          </MenuButton>
        </div>
        <div data-role="center-side" className="flex-1"></div>
        <div data-role="right-side" className="flex items-center">
          <Link href="/" className="h-full" passHref>
            <MenuButton className="h-full px-2">
              <IconTextLogoEng />
            </MenuButton>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavTop;

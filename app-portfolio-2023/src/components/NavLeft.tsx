'use client';
import { joinClass } from '@/utils';
import { useNavOpen } from '@/utils/store';
import IconLogoGeometry from './icons/IconLogoGeometry';
import IconClose from './icons/IconClose';
import NavLeftItem from './NavLeftItem';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

const NavLeft = () => {
  const { navOpen, setNavOpen } = useNavOpen();
  const pathname = usePathname();
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);
  if (!navOpen) return null;
  return (
    <nav
      data-comp="nav-left"
      className={joinClass(
        'fixed z-menu-side w-full sm:w-[288px] bg-yellow-base h-screen text-black top-0',
        'dark:bg-pink-base dark:text-white'
      )}
    >
      <div className="sm:h-nav-top" />
      <div className="margin h-[50px]" />
      <Link
        href="/"
        data-active={pathname === '/'}
        className="data-[active=true]:text-pink-base"
      >
        <IconLogoGeometry className="mx-auto" />
      </Link>
      <button
        className={joinClass(
          'absolute right-[20px] top-[20px] p-5',
          'sm:sr-only transition-colors'
        )}
        onClick={() => setNavOpen(false)}
      >
        <IconClose />
      </button>
      <ul className="flex flex-col items-center">
        <NavLeftItem href="/search" activeCondition={/\/search(\/.+||)/}>
          search
        </NavLeftItem>
        <NavLeftItem href="/posts" activeCondition={/\/posts(\/.+||)/}>
          posts
        </NavLeftItem>
        <NavLeftItem href="/works" activeCondition={/\/works(\/.+||)/}>
          works
        </NavLeftItem>
        <NavLeftItem href="/contact" activeCondition={/\/contact(\/.+||)/}>
          contact
        </NavLeftItem>
      </ul>
    </nav>
  );
};

export default NavLeft;

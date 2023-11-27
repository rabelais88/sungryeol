'use client';
import { joinClass } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, useMemo } from 'react';

interface NavLeftItemProps extends PropsWithChildren {
  href: string;
  activeCondition: RegExp;
}
const NavLeftItem = ({ href, children, activeCondition }: NavLeftItemProps) => {
  const pathname = usePathname();
  const active = useMemo(
    () => activeCondition.test(pathname),
    [pathname, activeCondition]
  );
  return (
    <li className="h-[60px]">
      <Link
        href={href}
        className={joinClass(
          'text-black border-b border-black p-4',
          'data-[active=true]:text-pink-base data-[active=true]:border-pink-base data-[active=true]:border-b-2',
          'dark:text-white dark:border-white',
          'dark:data-[active=true]:text-black dark:data-[active=true]:border-black'
        )}
        data-active={active}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavLeftItem;

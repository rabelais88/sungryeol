import { joinClass } from '@/utils';
import { DOMAttributes, PropsWithChildren } from 'react';

interface TagProps
  extends PropsWithChildren,
    PropsWithClass,
    DOMAttributes<HTMLSpanElement> {
  active?: boolean;
}
const Tag = ({ children, className, active }: TagProps) => {
  return (
    <span
      data-comp="tag"
      data-active={active}
      className={joinClass(
        'inline-flex text-black rounded-full border border-[#1a202c] text-sm font-normal px-2 h-[24px]',
        'dark:border-white dark:text-white',
        'data-[active=true]:bg-black data-[active=true]:text-white',
        'dark:data-[active=true]:bg-white dark:data-[active=true]:text-black-base',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Tag;

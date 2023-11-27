import { joinClass } from '@/utils';
import { DOMAttributes, PropsWithChildren } from 'react';

export interface ButtonOutlineProps
  extends PropsWithChildren,
    PropsWithClass,
    DOMAttributes<HTMLButtonElement> {}
const ButtonOutline = ({
  children,
  className,
  ...props
}: ButtonOutlineProps) => {
  return (
    <button
      className={joinClass(
        'inline-flex justify-center items-center select-none whitespace-nowrap font-semibold',
        // 'outline outline-2 outline-transparent outline-offset-2',
        'rounded-[0.375rem]',
        'px-4 h-10',
        'border border-solid border-[#e2e8f0]',
        'transition-colors hover:bg-[#edf2f7]',
        'dark:hover:bg-white dark:hover:text-black',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonOutline;

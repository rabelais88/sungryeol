import { joinClass } from '@/utils';
import { PropsWithChildren } from 'react';

const MarkdownWrap = ({
  children,
  className,
}: PropsWithChildren & PropsWithClass) => {
  return (
    <div
      data-comp="markdown-wrap"
      className={joinClass(
        '[&_li]:list-disc [&_li]:ml-4',
        '[&_p]:text-base [&_p]:mt-[50px]',
        '[&_h1]:font-head [&_h2]:font-head [&_h3]:font-head [&_h4]:font-head',
        '[&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl',
        '[&>*+*]:mt-[40px]',
        className
      )}
    >
      {children}
    </div>
  );
};
export default MarkdownWrap;

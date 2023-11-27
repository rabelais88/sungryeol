import { joinClass } from '@/utils';
import { PropsWithChildren } from 'react';

const LayoutBase = ({
  className,
  children,
  pageName,
}: PropsWithClass & PropsWithChildren & { pageName: string }) => {
  return (
    <main
      data-comp="layout-base"
      data-page={pageName}
      className={joinClass(
        'flex min-h-screen flex-col py-24 max-w-full md:max-w-3xl mx-auto px-4 md:px-0',
        className
      )}
    >
      {children}
    </main>
  );
};
export default LayoutBase;

import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';
import { mergeClass } from '@/utils';

type AppLinkProps = Omit<LinkProps, 'href' | 'passHref'> &
  Pick<NextLinkProps, 'href'>;
const AppLink: React.FC<React.PropsWithChildren<AppLinkProps>> = ({
  href,
  children,
  className,
  ...props
}) => {
  return (
    <NextLink href={href} passHref {...mergeClass('app-link', className)}>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
};

export default AppLink;

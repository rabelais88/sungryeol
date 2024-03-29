import { Link, LinkProps } from '@chakra-ui/react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

type SharedLinkProps = {
  disabled?: boolean;
};
type ExternalLinkProps = LinkProps & { externalUrl: true } & SharedLinkProps;
type InternalLinkProps = Pick<NextLinkProps, 'href'> &
  Omit<LinkProps, 'href'> & { externalUrl?: false } & SharedLinkProps;
export type AppLinkProps = ExternalLinkProps | InternalLinkProps;

const AppLink: React.FC<PropsWithChildren<AppLinkProps>> = ({
  href,
  children,
  externalUrl,
  disabled,
  ...props
}) => {
  if (externalUrl) {
    return (
      <Link
        {...props}
        data-component="app-link"
        data-link-external="true"
        data-disabled={disabled}
        href={href}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      as={NextLink}
      {...props}
      data-component="app-link"
      data-link-external="false"
      data-disabled={disabled}
      // as it becomes NextLink, it also uses href prop from NextLink
      href={href as string}
    >
      {children}
    </Link>
  );
};

export default AppLink;

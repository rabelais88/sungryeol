import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
interface IProps extends Omit<LinkProps, 'href'> {
  href: NextLinkProps['href'];
}
const MenuTab: React.FC<IProps> = ({ children, href, ...props }) => {
  const router = useRouter();
  const classNames = ['menu-tab', router.pathname === href ? 'active' : ''];
  const className = classNames.join(' ');
  return (
    <NextLink href={href} passHref>
      <Link
        textAlign="left"
        h="44px"
        px="20px"
        pt="10px"
        _hover={{ textDecor: 'none' }}
        borderBottom="solid 1px black"
        sx={{
          '&.active,&:focus': {
            color: 'bg-pink',
            borderBottomColor: 'bg-pink',
            borderBottomWidth: '2px',
          },
        }}
        {...props}
        className={className}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default MenuTab;

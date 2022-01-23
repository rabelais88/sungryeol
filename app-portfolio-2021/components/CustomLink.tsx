import NextLink from 'next/link';
import { Link, LinkProps } from '@chakra-ui/react';

interface ICusomLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  disabled?: boolean;
}
const CustomLink: React.FC<ICusomLinkProps> = ({
  children,
  href,
  disabled = false,
  ...props
}) => {
  return (
    <NextLink href={href} passHref>
      <Link
        position="relative"
        className={disabled ? 'disabled' : ''}
        sx={{
          '&.disabled': {
            pointerEvents: 'none',
            _before: {
              bgColor: 'gray.100',
            },
          },
        }}
        _before={{
          content: "''",
          position: 'absolute',
          bgColor: 'pink.100',
          bottom: '0px',
          left: '7px',
          w: '100%',
          h: '5px',
          zIndex: -1,
          transition: '.3s',
        }}
        _hover={{
          _before: {
            left: '0',
            top: '0',
            h: '100%',
          },
        }}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default CustomLink;

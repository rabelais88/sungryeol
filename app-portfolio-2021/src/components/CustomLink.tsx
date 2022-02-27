import NextLink from 'next/link';
import { Link, LinkProps, Text } from '@chakra-ui/react';

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
            color: 'gray.300',
          },
          '&:where(:hover, :focus-visible)': {
            textDecor: 'none !important',
            bgSize: '100% 100%',
            backgroundPositionX: 'left',
          },
        }}
        textDecor="underline"
        textDecorationStyle="dotted"
        bgRepeat="no-repeat"
        bgPos="right"
        bgSize="0%,100%"
        // bgGradient does not work with storybook
        // bgGradient="linear(to-r, pink.100, pink.100)"
        // pink.100 = #FED7E2
        bgImg="linear-gradient(to right,#fed7e2,#fed7e2)"
        transition="background-size .35s"
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default CustomLink;

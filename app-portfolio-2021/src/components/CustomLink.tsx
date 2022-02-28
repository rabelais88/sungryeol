import NextLink from 'next/link';
import { Link, LinkProps, keyframes } from '@chakra-ui/react';

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
  const kfUnderline = keyframes`
from { background-position: 2px 19px; }
to { background-position: 500px 19px; }
`;
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
            bgImg: 'url("/images/wave-underline.svg")',
            bgRepeat: 'repeat-x',
            bgSize: '15px 5px',
            bgPos: '2px 19px',
            animation: `${kfUnderline} 15s linear infinite`,
            bgColor: 'transparent',
            paddingBottom: '5px',
          },
        }}
        textDecor="none"
        bgImg='url("/images/dot-underline.svg")'
        boxDecorationBreak="clone"
        bgRepeat="repeat-x"
        bgSize="4px 4px"
        bgPos="0px 19px"
        paddingBottom="5px"
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};

export default CustomLink;

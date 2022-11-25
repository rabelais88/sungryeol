import { mergeClass } from '@sungryeol/lib';
import { keyframes, useColorMode } from '@chakra-ui/react';
import AppLink, { AppLinkProps } from './AppLink';

const kfUnderline = keyframes`
from { background-position: left 2px bottom 2px; }
to { background-position: left 500px bottom 2px; }
`;

type PrettyLinkProps = AppLinkProps & {
  noUnderline?: boolean;
};

const PrettyLink: React.FC<React.PropsWithChildren<PrettyLinkProps>> = ({
  disabled,
  children,
  noUnderline,
  ...props
}) => {
  const { colorMode } = useColorMode();
  const underLineProps = {
    bgImg:
      colorMode === 'light'
        ? 'url("/images/dot-underline.svg")'
        : 'url("/images/dot-underline-white.svg")',
    bgRepeat: 'repeat-x',
    bgSize: '4px 4px',
    bgPos: 'bottom 2px left 2px',
  };
  return (
    <AppLink
      position="relative"
      {...mergeClass('pretty-link', disabled && 'disabled')}
      sx={{
        '&.disabled': {
          pointerEvents: 'none',
          color: 'gray.300',
          bgImg: 'none',
        },
        '&:where(:hover, :focus-visible)': {
          textDecor: 'none !important',
          bgImg:
            colorMode === 'light'
              ? 'url("/images/wave-underline.svg")'
              : 'url("/images/wave-underline-white.svg")',
          bgRepeat: 'repeat-x',
          bgSize: '15px 5px',
          bgPos: 'bottom 2px left 2px',
          animation: `${kfUnderline} 15s linear infinite`,
          bgColor: 'transparent',
          paddingBottom: '5px',
        },
      }}
      textDecor="none"
      // boxDecorationBreak="clone"
      {...(noUnderline ? {} : underLineProps)}
      paddingBottom="5px"
      {...props}
    >
      {children}
    </AppLink>
  );
};

export default PrettyLink;

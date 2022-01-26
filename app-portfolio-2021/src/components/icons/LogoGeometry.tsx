import { Icon, IconProps } from '@chakra-ui/react';

const LogoGeometry: React.FC<IconProps> = (props) => (
  <Icon viewBox="0 0 160 68" {...props} className="logo-geometry">
    <path
      d="M35.5 20C45 20 51 29 51 37V49H19V37C19 29 26 20 35.5 20Z"
      fill="currentColor"
    />
    <path d="M69 20L85 49H52L69 20Z" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M115 20H86V39H96V49H115V20Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M145 20H116V49H145V40H135V30H145V20Z"
      fill="currentColor"
    />
  </Icon>
);

export default LogoGeometry;

import { Box, Image, Text, useColorMode } from '@chakra-ui/react';
import PrettyLink from '../PrettyLink';

interface IContactItemProps {
  link: string;
  label: string;
  icon: string;
}

const ContactItem: React.FC<IContactItemProps> = ({
  link,
  label,
  icon,
  ...props
}) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      whiteSpace="nowrap"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="14px"
      mb="5"
    >
      <Image
        alt={`icon for ${icon}`}
        src={`/icons/icon-${icon}.svg`}
        display="inline-block"
        mr="10px"
        sx={
          colorMode === 'light'
            ? {}
            : {
                bgColor: 'white',
                borderRadius: '5px',
                p: '5px',
                width: '30px',
              }
        }
      />
      <PrettyLink href={link ?? ''}>
        <Text display="inline-block" fontWeight="bold">
          {label}
        </Text>
      </PrettyLink>
    </Box>
  );
};

export default ContactItem;

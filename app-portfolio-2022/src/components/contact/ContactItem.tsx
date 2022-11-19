import { Box, Image, Text } from '@chakra-ui/react';
import AppLink from '../AppLink';
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
  return (
    <Box
      whiteSpace="nowrap"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="14px"
      mb="5"
    >
      <Image src={`/icons/icon-${icon}.svg`} display="inline-block" mr="10px" />
      <PrettyLink href={link ?? ''}>
        <Text display="inline-block" fontWeight="bold">
          {label}
        </Text>
      </PrettyLink>
    </Box>
  );
};

export default ContactItem;

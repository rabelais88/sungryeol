// import { Box, Image, Text, useColorMode } from '@chakra-ui/react';
// import PrettyLink from '../PrettyLink';

import PrettyLink from '@/components/shared/PrettyLink';

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
  //   const { colorMode } = useColorMode();
  return (
    <div className="whitespace-nowrap flex justify-center items-center text-[14px] mb-5">
      <img
        alt={`icon for ${icon}`}
        src={`/icons/icon-${icon}.svg`}
        className="inline-block mr-[10px] dark:bg-[rgba(255,255,255.2)] dark:rounded-md dark:p-1 dark:w-7"
      />
      <PrettyLink href={link ?? ''}>
        <p className="inline-block font-bold">{label}</p>
      </PrettyLink>
    </div>
  );
};

export default ContactItem;

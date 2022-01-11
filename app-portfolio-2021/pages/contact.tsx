import { ReturnPromiseType } from '@/types';
import { GetStaticProps, NextPage } from 'next';
import { getContact } from '@/services/ContactService';
import {
  Box,
  Button,
  chakra,
  Heading,
  Image,
  Link,
  Text,
  useToast,
  Wrap,
} from '@chakra-ui/react';
import LayoutContact from '@/layout/LayoutContact';
import NextLink from 'next/link';
import { shortInternationalTime } from '@sungryeol/lib';
import IconShare from '@/components/icons/IconShare';
import copyToClipboard from '@/utils/copyToClipboard';
import Header from '@/components/Header';
// import { Canvas } from '@react-three/fiber';
// import { useRef } from 'react';
// import { OrbitControls } from '@react-three/drei';

interface IProps {
  contact: ReturnPromiseType<typeof getContact>;
}

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
    <NextLink href={link ?? ''} passHref>
      <Link
        whiteSpace="nowrap"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="14px"
      >
        <Image
          src={`/icons/icon-${icon}.svg`}
          display="inline-block"
          mr="10px"
        />
        <Text display="inline-block" fontWeight="bold">
          {label}
        </Text>
      </Link>
    </NextLink>
  );
};

// const Logo3D = () => {
//   const boxRef = useRef();
//   return (
//     <Canvas>
//       <OrbitControls />
//       <axesHelper scale="3" />
//       <mesh>
//         <boxGeometry ref={boxRef} />
//       </mesh>
//     </Canvas>
//   );
// };

// const ProfileVideo = () => {
//   return (
//     <Box
//       borderRadius="50%"
//       className="profile-video"
//       overflow="hidden"
//       w="250px"
//       h="250px"
//       position="relative"
//       mx="auto"
//     >
//       <iframe
//         style={{
//           left: '-25px',
//           position: 'absolute',
//           zIndex: 1,
//           pointerEvents: 'none',
//         }}
//         width="300"
//         height="300"
//         src="https://www.youtube.com/embed/HE3rPASCVHY?controls=0&autoplay=1&showinfo=0&autohide=1&loop=1&mute=1&modestbranding=1&playsinline=1&rel=0&playlist=HE3rPASCVHY"
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//       />
//     </Box>
//   );
// };

const Video = chakra('video');

const ProfileVideo = () => {
  return (
    <Box
      position="relative"
      w="250px"
      h="250px"
      borderRadius="50%"
      overflow="hidden"
      mx="auto"
      transform="translate3d(0, 0, 0)"
      z="-1"
    >
      <Video width="300px" autoPlay muted loop playsinline position="absolute">
        <source src="/video-profile.mp4" type="video/mp4" />
      </Video>
    </Box>
  );
};

const Contact: NextPage<IProps> = ({ contact }) => {
  const toast = useToast();
  const onCopy = () => {
    copyToClipboard(`
    Park Sungryeol
    박성렬
    linkedin: ${contact.linkedin}
    codepen: ${contact.codepen}
    github: ${contact.github}
    instagram: ${contact.instagram}
    observable hq: ${contact.observablehq}
    stack overflow: ${contact.stackoverflow}
    `);
    toast({ title: 'copied everything to clipboard', isClosable: true });
  };
  return (
    <LayoutContact>
      <Header
        title="지식공단 - contact"
        description="contact information of Sungryeol"
      />
      {/* <Box h="200px">
        <Logo3D />
      </Box> */}
      <Box height="80px" />
      <ProfileVideo />
      <Heading
        mt="50px"
        fontSize="62px"
        lineHeight="93px"
        fontWeight="100"
        letterSpacing="-0.085em"
        as="h1"
      >
        박성렬
      </Heading>
      <Text
        fontFamily="Hammersmith One"
        fontSize="28px"
        lineHeight="33.6px"
        fontWeight="400"
        mb="40px"
      >
        Park Sungryeol
      </Text>
      <Text
        fontFamily="Hammersmith One"
        fontSize="36px"
        lineHeight="120%"
        fontWeight="400"
        mb="15px"
      >
        FRONTEND / WEB
      </Text>
      <Text fontFamily="Hammersmith One" fontSize="25px" mb="50px">
        DEVELOPER
      </Text>
      <Wrap justify="center" spacing="30px">
        <ContactItem link={contact.linkedin} label="LinkedIn" icon="linkedin" />
        <ContactItem link={contact.codepen} label="CodePen" icon="codepen" />
        <ContactItem link={contact.github} label="Github" icon="github" />
        <ContactItem
          link={contact.instagram}
          label="Instagram"
          icon="instagram"
        />
        <ContactItem
          link={contact.observablehq}
          label="Observable HQ"
          icon="observable"
        />
        <ContactItem
          link={contact.stackoverflow}
          label="Stack Overflow"
          icon="stackoverflow"
        />
      </Wrap>
      <Button
        leftIcon={<IconShare />}
        mx="auto"
        display="block"
        mt="40px"
        size="sm"
        onClick={onCopy}
      >
        Copy everything to clipboard
      </Button>
      <Text textAlign="center" fontWeight="200" mt="40px">
        last updated at {shortInternationalTime(new Date(contact.publishedAt))}
      </Text>
    </LayoutContact>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const contact = await getContact();
  return { props: { contact }, revalidate: 60 };
};

export default Contact;

import { Box } from '@chakra-ui/react';

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
      zIndex="-1"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', width: '300px' }}
        poster="/images/video-profile-preview.png"
      >
        <source src="/video-profile.mp4" type="video/mp4" />
      </video>
    </Box>
  );
};
export default ProfileVideo;

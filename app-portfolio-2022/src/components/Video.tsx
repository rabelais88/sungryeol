import { Box } from '@chakra-ui/react';
import Vimeo, { VimeoProps } from '@u-wave/react-vimeo';

type VideoPropsShared = Pick<VimeoProps, 'className' | 'id'> & {
  url?: string;
  vimeoId?: string;
};
interface VideoPropsA extends VideoPropsShared {
  url: string;
}

interface VideoPropsB extends VideoPropsShared {
  vimeoId: string;
}

const Video: React.FC<VideoPropsA | VideoPropsB> = ({
  url,
  vimeoId,
  ...props
}) => {
  const video = url ?? vimeoId ?? '';
  if (video === '') return <Box>Video.tsx - no video provided!</Box>;
  return (
    <Vimeo
      video={video}
      className="video-embed"
      responsive
      style={{ width: '100%' }}
      {...props}
    />
  );
};

export default Video;

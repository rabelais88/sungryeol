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
  return (
    <Vimeo
      video={video}
      className="video-embed"
      height="600"
      responsive
      style={{ height: '600px', width: '100%' }}
      {...props}
    />
  );
};

export default Video;

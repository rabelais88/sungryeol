import { joinClass } from '@/utils';

const ProfileVideo = () => {
  return (
    <div
      className={joinClass(
        'relative w-[250px] h-[250px] rounded-full overflow-hidden',
        'mx-auto z-[-1]'
      )}
      style={{ transform: 'translate3d(0,0,0)' }}
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
    </div>
  );
};
export default ProfileVideo;

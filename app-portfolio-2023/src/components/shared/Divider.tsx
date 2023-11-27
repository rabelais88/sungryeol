import { joinClass } from '@/utils';

const Divider = ({ className }: PropsWithClass) => {
  return (
    <hr
      className={joinClass(
        'border-t border-black-base dark:border-white',
        className
      )}
    />
  );
};

export default Divider;

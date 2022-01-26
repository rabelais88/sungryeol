import type { Transition, Variants } from 'framer-motion';

interface IVariant {
  name: string;
  variants: Variants;
  transition: Transition;
}

export const slideUp: IVariant = {
  name: 'slideUp',
  variants: {
    initial: {
      opacity: 0,
      top: '100vh',
      scale: 0.4,
    },
    enter: {
      opacity: 1,
      top: '0vh',
      scale: 1,
    },
    exit: {
      opacity: 0,
      top: '100vh',
      scale: 0.4,
    },
  },
  transition: {
    duration: 0.7,
  },
};

export const slideRight: IVariant = {
  name: 'slideRight',
  variants: {
    initial: {
      opacity: 0,
      left: '-100vw',
    },
    enter: {
      opacity: 1,
      left: 0,
    },
    exit: {
      opacity: 0,
      left: '100vw',
    },
  },
  transition: {
    duration: 0.7,
  },
};

export const menuSlideDown: IVariant = {
  name: 'menuSlideDown',
  variants: {
    show: {
      opacity: 1,
      top: 0,
    },
    hide: {
      opacity: 0,
      top: '-50px',
    },
  },
  transition: {
    duration: 0.3,
  },
};

export const fade: IVariant = {
  name: 'fade',
  variants: {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  transition: {
    duration: 0.7,
  },
};

export const svgPath: IVariant = {
  name: 'svgPath',
  variants: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  },
  transition: {},
};

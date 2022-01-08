import type { Transition, Variants } from 'framer-motion';

interface IVariant {
  name: string;
  variants: Variants;
  transition: Transition;
}

export const slideUp: IVariant = {
  name: 'Slide Up',
  variants: {
    initial: {
      opacity: 0,
      top: '100vh',
      scale: 0.4,
    },
    animate: {
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
  name: 'Slide Right',
  variants: {
    initial: {
      opacity: 0,
      left: '-100%',
      scale: 0.6,
    },
    animate: {
      opacity: 1,
      left: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      left: '100%',
      scale: 0.6,
    },
  },
  transition: {
    duration: 0.7,
  },
};

export const fade: IVariant = {
  name: 'fade',
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
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

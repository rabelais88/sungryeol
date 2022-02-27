import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CustomLink from '@/components/CustomLink';
import { VStack } from '@chakra-ui/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/CustomLink',
  component: CustomLink,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CustomLink>;

export const Base: ComponentStory<typeof CustomLink> = () => {
  return (
    <div>
      <CustomLink href="#">this is a single link</CustomLink>
      <br />
      this is a <CustomLink href="#">inline link</CustomLink> in the middle of
      sentence.
      <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit,{' '}
      <CustomLink href="#">
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </CustomLink>{' '}
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
      <CustomLink href="#">한국어로 된 링크입니다</CustomLink>
    </div>
  );
};

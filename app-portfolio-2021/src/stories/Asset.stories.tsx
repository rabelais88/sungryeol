import React from 'react';
import { StoryFn } from '@storybook/react';
import { Box, Heading, Text } from '@chakra-ui/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AssetTest',
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export const AssetTest: StoryFn = () => {
  return (
    <div>
      <Heading>asset check</Heading>
      <Text>check if global assets are properly loaded</Text>
      <Text fontFamily="Hammersmith One">Font: Hammersmith One</Text>
      <Text fontFamily="Title">Font: Title(internal font)</Text>
      <Box bgColor="bg-yellow">color: bg-yellow</Box>
    </div>
  );
};
AssetTest.storyName = 'Asset Test';

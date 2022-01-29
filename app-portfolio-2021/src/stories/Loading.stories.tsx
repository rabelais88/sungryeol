import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Loading from '@/components/Loading/index';

export default {
  title: 'Components/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const Base = Template.bind({});

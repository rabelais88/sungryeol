import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import TagsRelations from '@/components/Chart/TagsRelations';
import samplePostsWithTag from './samplePostsWithTag';

export default {
  title: 'Components/Chart/TagsRelations',
  component: TagsRelations,
} as ComponentMeta<typeof TagsRelations>;

const Template: ComponentStory<typeof TagsRelations> = (args) => (
  <TagsRelations {...args} />
);

export const Sample1 = Template.bind({});
Sample1.args = { postsWithTag: samplePostsWithTag.postsWithTag };

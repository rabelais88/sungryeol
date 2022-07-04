import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
// import MDXRender from '@/components/MDXRender';
// import { serialize } from 'next-mdx-remote/serialize';
// import { mdxPostConfig } from '@/constants/mdxConfig';

// export default {
//   title: 'Components/MDXRender',
//   component: MDXRender,
// } as ComponentMeta<typeof MDXRender>;

// const postLoader = (source: string) => [
//   async () => ({ mdxSource: await serialize(source, mdxPostConfig) }),
// ];
// const Template: ComponentStory<typeof MDXRender> = (
//   args,
//   { loaded: { mdxSource } }
// ) => {
//   console.log('mdxSource', mdxSource);
//   return <MDXRender mdxSource={mdxSource} />;
// };

// export const Markdown1 = Template.bind({});
// Markdown1.loaders = postLoader(`
// # sample markdown 1
// ## this is seconddary heading

// hello people, this story is set for testing.

// `);
// Markdown1.storyName = 'MDXRender';

export default {
  title: 'Components/MDXRender',
};

export const Base = () => {
  return (
    <div>
      MDXRender cannot be tested in storybook, due to a conflict with storybook
      internal mdx modules.
    </div>
  );
};
Base.storyName = 'MDXRender';

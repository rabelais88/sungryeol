import { SerializeOptions } from 'next-mdx-remote/dist/types';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeTOC from 'rehype-toc';
import remarkGfm from 'remark-gfm';
import remarkPrism from 'remark-prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export const mdxWorkConfig: SerializeOptions = {};

// working on math support
// https://nickymeuleman.netlify.app/blog/math-gatsby-mdx

export const mdxPostConfig: SerializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkPrism as any, remarkMath],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeTOC, rehypeKatex],
  },
};

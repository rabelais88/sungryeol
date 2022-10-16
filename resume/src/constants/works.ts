import type { IWorkMDXFrontMatter } from '@/types';

const works = await import.meta.glob<IWorkMDXFrontMatter>('../../mdx/**/*.mdx');
export default works;

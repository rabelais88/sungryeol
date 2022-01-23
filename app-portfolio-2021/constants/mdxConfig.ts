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

const customizeTOCItem = (toc: any, heading: any) => {
  // console.log('toc', JSON.stringify(toc));
  // console.log('heading', JSON.stringify(heading));

  return toc;
};

// heading
// {
//   type: 'element',
//   tagName: 'h1',
//   properties: { id: '한글-제목입니다' },
//   children: [
//     {
//       type: 'element',
//       tagName: 'a',
//       properties: [Object],
//       children: [Array]
//     },
//     { type: 'text', value: '한글 제목입니다', position: [Object] }
//   ],
//   position: {
//     start: { line: 26, column: 1, offset: 4292 },
//     end: { line: 26, column: 11, offset: 4302 }
//   }
// }

// toc
// {
//   "type":"element",
//   "tagName":"li",
//   "data":{
//      "hookArgs":[
//         {
//            "type":"element",
//            "tagName":"h1",
//            "properties":{
//               "id":"한글-제목입니다"
//            },
//            "children":[
//               {
//                  "type":"element",
//                  "tagName":"a",
//                  "properties":{
//                     "ariaHidden":"true",
//                     "tabIndex":-1,
//                     "href":"#한글-제목입니다"
//                  },
//                  "children":[
//                     {
//                        "type":"element",
//                        "tagName":"span",
//                        "properties":{
//                           "className":[
//                              "icon",
//                              "icon-link"
//                           ]
//                        },
//                        "children":[

//                        ]
//                     }
//                  ]
//               },
//               {
//                  "type":"text",
//                  "value":"한글 제목입니다",
//                  "position":{
//                     "start":{
//                        "line":26,
//                        "column":3,
//                        "offset":4294
//                     },
//                     "end":{
//                        "line":26,
//                        "column":11,
//                        "offset":4302
//                     }
//                  }
//               }
//            ],
//            "position":{
//               "start":{
//                  "line":26,
//                  "column":1,
//                  "offset":4292
//               },
//               "end":{
//                  "line":26,
//                  "column":11,
//                  "offset":4302
//               }
//            }
//         }
//      ]
//   },
//   "properties":{
//      "className":"toc-item toc-item-h1"
//   },
//   "children":[
//      {
//         "type":"element",
//         "tagName":"a",
//         "properties":{
//            "className":"toc-link toc-link-h1",
//            "href":"#한글-제목입니다"
//         },
//         "children":[
//            {
//               "type":"text",
//               "value":"한글 제목입니다"
//            }
//         ]
//      }
//   ]
// }

export const mdxPostConfig: SerializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkPrism as any, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypeTOC, { customizeTOCItem }],
    ],
  },
};

import { css } from '@emotion/react';
import styled from '@emotion/styled';

/* PrismJS 1.26.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript */
const prismCodeStyle = css`
  code[class*='language-'],
  pre[class*='language-'] {
    color: #ccc;
    background: 0 0;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }
  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #2d2d2d;
  }
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
  .token.block-comment,
  .token.cdata,
  .token.comment,
  .token.doctype,
  .token.prolog {
    color: #999;
  }
  .token.punctuation {
    color: #ccc;
  }
  .token.attr-name,
  .token.deleted,
  .token.namespace,
  .token.tag {
    color: #e2777a;
  }
  .token.function-name {
    color: #6196cc;
  }
  .token.boolean,
  .token.function,
  .token.number {
    color: #f08d49;
  }
  .token.class-name,
  .token.constant,
  .token.property,
  .token.symbol {
    color: #f8c555;
  }
  .token.atrule,
  .token.builtin,
  .token.important,
  .token.keyword,
  .token.selector {
    color: #cc99cd;
  }
  .token.attr-value,
  .token.char,
  .token.regex,
  .token.string,
  .token.variable {
    color: #7ec699;
  }
  .token.entity,
  .token.operator,
  .token.url {
    color: #67cdcc;
  }
  .token.bold,
  .token.important {
    font-weight: 700;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .token.inserted {
    color: green;
  }
`;

const PrismCodeStyle = styled.div`
  ${prismCodeStyle}
`;

export default PrismCodeStyle;
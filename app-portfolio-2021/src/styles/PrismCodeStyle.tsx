import { css } from '@emotion/react';
import styled from '@emotion/styled';

/* PrismJS 1.26.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript */
const prismCodeStyle = css`
  code[class*='language-'],
  pre[class*='language-'] {
    color: #000;
    background: 0 0;
    text-shadow: 0 1px #fff;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 14px;
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
  code[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  pre[class*='language-']::-moz-selection {
    text-shadow: none;
    background: #b3d4fc;
  }
  code[class*='language-'] ::selection,
  code[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  pre[class*='language-']::selection {
    text-shadow: none;
    background: #b3d4fc;
  }
  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }
  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #f5f2f0;
  }
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }
  .token.cdata,
  .token.comment,
  .token.doctype,
  .token.prolog {
    color: #708090;
  }
  .token.punctuation {
    color: #999;
  }
  .token.namespace {
    opacity: 0.7;
  }
  .token.boolean,
  .token.constant,
  .token.deleted,
  .token.number,
  .token.property,
  .token.symbol,
  .token.tag {
    color: #905;
  }
  .token.attr-name,
  .token.builtin,
  .token.char,
  .token.inserted,
  .token.selector,
  .token.string {
    color: #690;
  }
  .language-css .token.string,
  .style .token.string,
  .token.entity,
  .token.operator,
  .token.url {
    color: #9a6e3a;
  }
  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #07a;
  }
  .token.class-name,
  .token.function {
    color: #dd4a68;
  }
  .token.important,
  .token.regex,
  .token.variable {
    color: #e90;
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
`;

const PrismCodeStyle = styled.div`
  ${prismCodeStyle}
`;

export default PrismCodeStyle;

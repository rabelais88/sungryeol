import type { getPost } from '@/services/PostService';
import type { ReturnPromiseType } from '@/types';

// accessible by test-0 ~ test-n
const testMarkdowns: ReturnPromiseType<typeof getPost>[] = [
  {
    title: 'markdown 1',
    content: `
# heading 1

## heading 2

### heading 3

#### heading 4

*emphasized text*

**bold text**

\`inline test\`

\`\`\`javascript
const myVar = 1;
var abc = 1 + myVar;
\`\`\`

testing code

<img src="/images/sample-sid-suratia-Y_p9uzin_Vc-unsplash.jpg" />
![image alt](/images/sample-sid-suratia-Y_p9uzin_Vc-unsplash.jpg "image with options[@options:{width: 555,height:555}]")

`,
    publishedAt: new Date().toString(),
    tags: {
      data: [],
    },
  },
];

export default testMarkdowns;

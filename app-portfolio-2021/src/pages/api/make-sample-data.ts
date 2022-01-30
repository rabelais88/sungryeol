import type { NextApiHandler } from 'next';
import { getPostsWithTag } from '@/services/TagService';

const MakeSampleDataHandler: NextApiHandler = async (req, res) => {
  try {
    const postsWithTag = await getPostsWithTag();
    res.status(200).json({ code: 'SUCCESS', data: postsWithTag });
    return;
  } catch (err) {
    if (err instanceof Error) console.error(err.toString());
    res.status(500).json({ code: 'SERVER_ERROR' });
    return;
  }
};

export default MakeSampleDataHandler;

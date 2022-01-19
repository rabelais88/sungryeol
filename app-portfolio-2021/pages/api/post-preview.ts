import { getPost } from '@/services/PostService';
import type { NextApiHandler } from 'next';

const PreviewHandler: NextApiHandler = async (req, res) => {
  const uid = `${req.query?.uid}`;
  console.log(req.query.preview, uid);
  if (req.query?.preview !== process.env.PREVIEW_KEY || uid === '') {
    res.status(404).json({ code: 'ARTICLE_NOT_EXIST_OR_WRONG_PREVIEW_KEY' });
    return;
  }
  try {
    console.log('fetching preview...', uid);
    const post = await getPost(uid, true);
    res.setPreviewData(post);
    res.redirect(`/posts/${uid}`);
    console.log('successfully fetched preview');
    return;
  } catch (err) {
    console.error('error while fetching preview', JSON.stringify(err));
    res.status(500).json({ code: 'SERVER_ERROR_WHILE_FETCHING_ARTICLE' });
    return;
  }
};

export default PreviewHandler;

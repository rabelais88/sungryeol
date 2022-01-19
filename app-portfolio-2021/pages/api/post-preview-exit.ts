import type { NextApiHandler } from 'next';

const PreviewHandler: NextApiHandler = async (req, res) => {
  res.clearPreviewData();
  res.redirect('/posts');
};

export default PreviewHandler;

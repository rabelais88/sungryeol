import type { NextApiHandler } from 'next';

const PreviewHandler: NextApiHandler = async (req, res) => {
  res.clearPreviewData();
  res.redirect('/');
};

export default PreviewHandler;

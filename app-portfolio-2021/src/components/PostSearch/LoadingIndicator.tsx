import { connectStateResults } from 'react-instantsearch-dom';
import dynamic from 'next/dynamic';

const Loading = dynamic(() => import('@/components/Loading'));

const LoadingIndicator = connectStateResults(({ searching, children }) => {
  if (!searching) return null;
  return <Loading mx="auto" />;
});

export default LoadingIndicator;

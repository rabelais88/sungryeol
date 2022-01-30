import { IPostWithTag } from '@/types';
import { Box, BoxProps } from '@chakra-ui/react';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { px } from '@sungryeol/lib';

type PostsWithTag = IPostWithTag[];
interface ITagRelationsProps extends Omit<BoxProps, 'width' | 'height'> {
  postsWithTag: PostsWithTag;
  width?: number;
  height?: number;
}
const TagRelations: React.FC<ITagRelationsProps> = ({
  postsWithTag,
  width = 500,
  height = 500,
  ...props
}) => {
  const refSvg = useRef(null);
  useEffect(() => {
    if (refSvg?.current && postsWithTag) {
      console.log(postsWithTag);
      const svg = d3.select(refSvg.current);
    }
  }, [refSvg?.current, postsWithTag]);
  return (
    <Box
      className="tag-relations"
      {...props}
      width="100%"
      height={px(height)}
      bgColor="lightgray"
      sx={{
        svg: {
          width: px(width),
          height: px(height),
          bgColor: 'gray',
        },
      }}
    >
      <svg ref={refSvg} id="tag-relations-svg"></svg>
    </Box>
  );
};

export default TagRelations;

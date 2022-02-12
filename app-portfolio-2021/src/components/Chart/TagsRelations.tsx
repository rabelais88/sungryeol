import { IGetTagStatsResult } from '@/types';
import { Box, BoxProps, StatGroup } from '@chakra-ui/react';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { px, trans } from '@sungryeol/lib';

interface ITagRelationsProps extends Omit<BoxProps, 'width' | 'height'> {
  tagStats: IGetTagStatsResult;
  width?: number;
  height?: number;
  marginX?: number;
  marginY?: number;
}

const normalizeData = (tagStats: IGetTagStatsResult) => {
  const tags = tagStats.tags.data.map((t) => {
    return {
      id: t.id,
      label: t.attributes.label,
      key: t.attributes.key,
      relatedTags: t.attributes.posts.data.reduce<Record<string, number>>(
        (ac, cv) => {
          const frequency: Record<string, number> = { ...ac };
          cv.attributes.tags.data.forEach((postTag) => {
            if (postTag.id === t.id) return;
            frequency[postTag.attributes.key] =
              (frequency[postTag.attributes.key] || 0) + 1;
          });
          return frequency;
        },
        {}
      ),
    };
  });
  return tags;
};

interface IGetConfigArg {
  width: number;
  height: number;
  marginX: number;
  marginY: number;
}
const getConfig = (config: IGetConfigArg) => {
  const { width, height, marginX, marginY } = config;
  const innerWidth = width - marginX * 2;
  const innerHeight = height - marginY * 2;
  return { ...config, innerWidth, innerHeight };
};

const TagRelations: React.FC<ITagRelationsProps> = ({
  tagStats,
  width = 500,
  height = 500,
  marginX = 100,
  marginY = 100,
  ...props
}) => {
  const refSvg = useRef(null);
  useEffect(() => {
    if (refSvg?.current && tagStats) {
      const normalizedData = normalizeData(tagStats);
      const { innerWidth, innerHeight } = getConfig({
        width,
        height,
        marginX,
        marginY,
      });
      const svg = d3.select(refSvg.current);
      const hasG = !svg.select('g').empty();
      if (!hasG) svg.append('g').attr(...trans(marginX, marginY));
    }
  }, [refSvg?.current, tagStats]);
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

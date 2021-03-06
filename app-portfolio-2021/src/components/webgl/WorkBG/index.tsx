import { Box, BoxProps } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useRef, useEffect, useCallback, MouseEventHandler } from 'react';
import GL from './GL';

const WorkBG: React.FC<BoxProps> = (props) => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refState = useRef({ gl: new GL() });
  const refDiv = useRef<HTMLDivElement>(null);

  const onResize = useCallback(() => {
    if (!refCanvas.current || !refDiv.current) return;
    refState.current.gl.resize(
      refDiv.current.clientWidth,
      refDiv.current.clientHeight ?? 0
    );
  }, []);
  const onMouseMove = useCallback((ev: MouseEvent) => {
    if (!refCanvas.current || !refDiv.current) return;
    const x = (ev.clientX / window.innerWidth) * 2 - 1;
    const y = -(ev.clientY / window.innerHeight) * 2 + 1;
    refState.current.gl.onMouseMove(x, y);
  }, []);
  useEffect(() => {
    if (!refCanvas.current || !refDiv.current) return;
    const state = refState.current;
    if (state.gl.destroyed) state.gl = new GL();

    state.gl.init({
      canvas: refCanvas.current,
      width: refDiv.current.clientWidth ?? 0,
      height: refDiv.current.clientHeight ?? 0,
    });
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onMouseMove);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMouseMove);
      state.gl.destroy();
    };
  }, []);
  return (
    <Box ref={refDiv} className="work-bg" {...props}>
      <canvas ref={refCanvas} className="gl"></canvas>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(WorkBG), { ssr: false });

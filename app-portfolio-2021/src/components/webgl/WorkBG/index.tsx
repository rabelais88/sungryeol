import dynamic from 'next/dynamic';
import { useRef, useEffect, useCallback } from 'react';
import GL from './GL';

const WorkBG: React.FC = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refState = useRef({ gl: new GL() });

  const onResize = useCallback(() => {
    if (!refCanvas.current) return;
    console.log('resizing');
    refState.current.gl.resize(
      refCanvas.current.clientWidth,
      refCanvas.current.clientHeight
    );
  }, []);
  useEffect(() => {
    if (!refCanvas.current) return;
    const state = refState.current;
    console.log('useEffect() triggering init');
    if (state.gl.destroyed) state.gl = new GL();
    state.gl.init({
      canvas: refCanvas.current,
      width: refCanvas.current.clientWidth,
      height: refCanvas.current.clientHeight,
    });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      state.gl.destroy();
    };
  }, []);
  return <canvas ref={refCanvas} className="gl work-bg"></canvas>;
};

export default dynamic(() => Promise.resolve(WorkBG), { ssr: false });

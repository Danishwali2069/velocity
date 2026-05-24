import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.12;
      current.current.y += (pos.current.y - current.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = current.current.x + 'px';
        cursorRef.current.style.top = current.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onDown = () => cursorRef.current && (cursorRef.current.style.transform = 'translate(-50%,-50%) scale(0.65)');
    const onUp = () => cursorRef.current && (cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)');

    const onEnter = () => cursorRef.current && (cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1.8)');
    const onLeave = () => cursorRef.current && (cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.querySelectorAll('button, a, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{ transform: 'translate(-50%,-50%)' }}
      />
      <div
        ref={dotRef}
        className="cursor-dot"
      />
    </>
  );
}

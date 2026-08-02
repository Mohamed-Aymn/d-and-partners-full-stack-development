import { useRef, useEffect } from 'react';


export function useRenderCount(name?: string) {
  const count = useRef(0);

  // Increment ref count strictly per completed render
  count.current += 1;

  useEffect(() => {
    if (name) {
      console.log(`[${name}] Render #${count.current}`);
    }
  });

  return count.current;
}
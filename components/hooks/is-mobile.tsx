import { useState, useEffect } from 'react';

type Props = {
  breakpoint?: number;
};

export default function useIsMobile({ breakpoint = 992 }: Props = {}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    
    const html      = document.documentElement;
    const prevStyle = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prevStyle;    
    });
  }, [pathname]);

  return null;
}

import { useMemo, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Portal({ children, parent, className }: any) {
  const el = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;
    const classList = ['portal-container'];
    if (className)
      className.split(' ').forEach((item: any) => classList.push(item));
    classList.forEach((item) => el.classList.add(item));
    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [el, parent, className]);

  return ReactDOM.createPortal(children, el);
}

import { useEffect } from 'react';

const useIntersectionObserver = ({
  target,
  onIntersect,
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect);
    observer.observe(target.current);
    const currentTarget = target.current;
    return () => observer.unobserve(currentTarget);
  });
};

export default useIntersectionObserver;

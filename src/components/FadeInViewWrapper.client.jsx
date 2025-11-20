import React, {useRef, useEffect} from 'react';

const FadeInViewWrapper = ({children}) => {
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.current.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
      },
    );

    const elements = document.querySelectorAll('.in-view');
    elements.forEach((el) => {
      observer.current.observe(el);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return <div className="fade-in-view-wrapper">{children}</div>;
};

export default FadeInViewWrapper;

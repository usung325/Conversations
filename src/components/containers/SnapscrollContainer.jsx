import React, { useEffect, useRef, useState, useCallback } from "react";

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function SnapScrollContainer({ children, isScrollRight }) {
  const containerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const pageNav = [0, 1, 2];

  const handleScroll = useCallback(
    debounce(() => {
      if (!isScrolling) {
        setIsScrolling(true);
        const container = containerRef.current;
        const containerHeight = container.clientHeight;
        const scrollTop = container.scrollTop;
        const currentSection = Math.round(scrollTop / containerHeight);

        container.scrollTo({
          top: currentSection * containerHeight,
          behavior: "smooth",
        });

        // Reset isScrolling after animation completes
        setTimeout(() => setIsScrolling(false), 1000);
      }

      const container = containerRef.current;
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const currentSection = Math.round(scrollTop / containerHeight);
      setPageIndex(Math.round((currentSection * containerHeight) / 1080));
    }, 50),
    [isScrolling]
  );

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="flex flex-row justify-center items-center content-center gap-5 mx-auto -mt-20">
      {!isScrollRight ? (
        <div>
          <div className="flex flex-col gap-2">
            {pageNav.map((page, i) =>
              pageIndex === i ? (
                <img src="/images/active.png" className="max-w-1" />
              ) : (
                <img src="/images/inactive.png" className="max-w-1" />
              )
            )}
          </div>
        </div>
      ) : null}

      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="h-screen snap-start">
            {child}
          </div>
        ))}
      </div>

      {isScrollRight ? (
        <div className="">
          <div className="flex flex-col gap-2 ">
            {pageNav.map((page, i) =>
              pageIndex === i ? (
                <img src="/images/active.png" className="max-w-1" />
              ) : (
                <img src="/images/inactive.png" className="max-w-1" />
              )
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

import { useEffect, useState } from 'react';

type TitleCarouselProps = {
  titles: string[];
};

// Vertical rotating titles. Animation is CSS-driven, so prefers-reduced-motion
// (handled globally in globals.css) turns the slide into an instant swap.
export function TitleCarousel({ titles }: TitleCarouselProps) {
  const [state, setState] = useState({ current: 0, previous: -1 });

  useEffect(() => {
    if (titles.length < 2) return;
    const timer = setInterval(() => {
      setState((s) => ({ current: (s.current + 1) % titles.length, previous: s.current }));
    }, 3000);
    return () => clearInterval(timer);
  }, [titles.length]);

  return (
    <div className="title-carousel" aria-label={titles.join(', ')}>
      {titles.map((title, i) => (
        <span
          key={title}
          aria-hidden="true"
          className={`title-carousel-item${
            i === state.current ? ' current' : i === state.previous ? ' previous' : ''
          }`}
        >
          {title}
        </span>
      ))}
    </div>
  );
}

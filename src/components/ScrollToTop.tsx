import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 p-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl shadow-2xl shadow-emerald-950/60 transition-all duration-300 hover:scale-110 active:scale-95 border border-emerald-300/40 flex items-center justify-center group cursor-pointer"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
    </button>
  );
};

import React, { useEffect } from 'react';

import { Logo } from '../Logo';

import './Footer.scss';
import { InfoLinks } from '../InfoLinks';

export const Footer: React.FC = () => {
  useEffect(() => {
    const backToTopButton = document.querySelector(
      '.Footer__backToTop',
    ) as HTMLButtonElement;
    const handleScroll = () => {
      if (!backToTopButton) {
        return;
      }

      if (window.scrollY > 300) {
        backToTopButton.classList.add('Footer__backToTop--visible');
      } else {
        backToTopButton.classList.remove('Footer__backToTop--visible');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="Footer">
      <div className="Footer__container">
        <Logo />

        <InfoLinks location="footer" />

        <button
          onClick={scrollToTop}
          className="Footer__backToTop"
          aria-label="Back to top"
          title="Back to top"
          role="button"
        >
          <span className="Footer__backToTopName">Back to top</span>
          <span className="Footer__backToTopBtn">
            <i className="fas fa-chevron-up" />
          </span>
        </button>
        <div className="Footer__empty"></div>
      </div>
    </footer>
  );
};

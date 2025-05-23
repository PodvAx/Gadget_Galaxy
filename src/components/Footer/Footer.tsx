import React from 'react';

import { Logo } from '../Logo';

import './Footer.scss';
import { InfoLinks } from '../InfoLinks';

export const Footer: React.FC = () => {
  return (
    <footer className="Footer">
      <div className="Footer__container">
        <Logo />

        <InfoLinks location="footer" />

        <a
          href="#top"
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="Footer__backToTop"
        >
          <span className="Footer__backToTopName">Back to top</span>
          <span className="Footer__backToTopBtn">
            <i className="fas fa-chevron-up" />
          </span>
        </a>
      </div>
    </footer>
  );
};

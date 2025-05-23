import React, { useState } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';

import './App.scss';
import { MobileMenu } from '../MobileMenu';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  return (
    <div className="App">
      <Header openMenu={openMenu} />
      <MobileMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
      <Main />
      <Footer />
    </div>
  );
};

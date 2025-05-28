import React, { memo, useEffect, useRef } from 'react';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';

import './MobileMenu.scss';
import { Navbar } from '../Navbar';

import crossIcon from '../../images/icons/Cross_icon.svg';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { HeaderBtn } from '../HeaderBtn';
import { InfoLinks } from '../InfoLinks';

type Props = {
  isMenuOpen: boolean;
  closeMenu: () => void;
};

export const MobileMenu: React.FC<Props> = memo(({ closeMenu, isMenuOpen }) => {
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  const getMenuClass = () =>
    classNames('MobileMenu', { 'MobileMenu--open': isMenuOpen });

  useEffect(() => {
    if (isMenuOpen) {
      closeMenu();
    }
  }, [location.pathname]);

  useEffect(() => {
    const menu = menuRef.current;

    if (isMenuOpen && menu) {
      disableBodyScroll(menu);
    } else if (menu) {
      enableBodyScroll(menu);
    }

    return () => {
      if (menu) {
        enableBodyScroll(menu);
      }

      clearAllBodyScrollLocks();
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef} className={getMenuClass()}>
      <div className="MobileMenu__container">
        <div className="MobileMenu__linkContainer">
          <HeaderBtn icon={crossIcon} iconAlt="Close menu" action={closeMenu} />
        </div>
        <Navbar />

        <InfoLinks location="menu" />
      </div>
    </div>
  );
});

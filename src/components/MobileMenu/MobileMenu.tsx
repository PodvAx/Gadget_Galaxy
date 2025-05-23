import React, { memo, useEffect } from 'react';

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

  const getMenuClass = () =>
    classNames('MobileMenu', { 'MobileMenu--open': isMenuOpen });

  useEffect(() => {
    if (isMenuOpen) {
      closeMenu();
    }
  }, [location.pathname]);

  return (
    <div className={getMenuClass()}>
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

import React, { memo, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { Search } from '../Search';

import { Cart } from '../../utils/Cart';
import { Favorites } from '../../utils/Favorites';

import './Header.scss';

import cartIcon from '../../images/icons/Cart_icon.svg';
import menuBurgerIcon from '../../images/icons/Menu_Burger_icon.svg';
import { HeaderBtn } from '../HeaderBtn';

type Props = {
  openMenu: () => void;
};

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('Header__link', { 'Header__link--active': isActive });

export const Header: React.FC<Props> = memo(({ openMenu }) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isSmallDesktop, setIsSmallDesktop] = useState(
    window.innerWidth >= 1024,
  );
  const [isBigDesktop, setIsBigDesktop] = useState(window.innerWidth >= 1440);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  const { pathname } = useLocation();

  const isSearchShown = useMemo(
    () =>
      ['/phones', '/tablets', '/accessories', '/favourites'].includes(pathname),
    [pathname],
  );

  const isCartPage = useMemo(() => pathname === '/cart', [pathname]);

  useEffect(() => {
    Cart.load();
    Favorites.load();

    const updateCartItemCount = () => {
      setCartItemsCount(Cart.getTotalLength());
    };

    const updateFavoritesCount = () => {
      setFavoritesCount(Favorites.getTotalLength());
    };

    const handleResize = () => {
      setIsSmallDesktop(window.innerWidth >= 1024);
      setIsBigDesktop(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    updateCartItemCount();
    updateFavoritesCount();

    Cart.subscribe(updateCartItemCount);
    Favorites.subscribe(updateFavoritesCount);

    return () => {
      Cart.unsubscribe(updateCartItemCount);
      Favorites.unsubscribe(updateFavoritesCount);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > lastScrollY && window.scrollY > 50) {
            setShowHeader(false); // скрол вниз — ховаємо
          } else {
            setShowHeader(true); // скрол вгору — показуємо
          }

          setLastScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={classNames('Header', { 'Header--hidden': !showHeader })}
      id="top"
    >
      <div className="Header__container">
        <section className="Header__startBlock">
          <Logo />

          {!isCartPage && isSmallDesktop && <Navbar />}
        </section>

        <section className="Header__endBlock">
          {isSearchShown && isBigDesktop && (
            <Search category={pathname.slice(1)} />
          )}

          {!isCartPage && (
            <article className="Header__linkContainer">
              <NavLink className={getLinkClass} to="/favourites">
                {favoritesCount > 0 && (
                  <div className="Header__linkCounter">{favoritesCount}</div>
                )}

                <i className="far fa-heart Header__heart" />
              </NavLink>
            </article>
          )}

          <article className="Header__linkContainer">
            <NavLink
              className={getLinkClass}
              to="/cart"
              state={{ prevPathname: pathname }}
            >
              {cartItemsCount > 0 && (
                <div className="Header__linkCounter">{cartItemsCount}</div>
              )}

              <img src={cartIcon} alt="Cart" className="Header__icon" />
            </NavLink>
          </article>
          <article className="Header__btnContainer Header__menuBtn">
            <HeaderBtn icon={menuBurgerIcon} iconAlt="Menu" action={openMenu} />
          </article>
        </section>
      </div>
    </header>
  );
});

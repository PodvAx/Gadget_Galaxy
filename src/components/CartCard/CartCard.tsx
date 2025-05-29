import React, { memo, useMemo, useState } from 'react';
import classNames from 'classnames';

import { Cart, CartItem } from '../../utils/Cart';

import './CartCard.scss';
import { API_URL } from '../../utils/api';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

type Props = {
  item: CartItem;
};

const MAX_QUANTITY = 10;
const MIN_QUANTITY = 1;

export const CartCard: React.FC<Props> = memo(({ item }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { image, name, price, category, itemId } = item.product;
  const { quantity, id } = item;

  const link = `/${category}/:${itemId}`;

  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const isMinusDisabled = useMemo(
    () => currentQuantity === MIN_QUANTITY,
    [currentQuantity],
  );
  const isPlusDisabled = useMemo(
    () => currentQuantity === MAX_QUANTITY,
    [currentQuantity],
  );

  const handlePlus = () => {
    Cart.plusItem(id);
    setCurrentQuantity(prev => prev + 1);
  };

  const handleMinus = () => {
    Cart.minusItem(id);
    setCurrentQuantity(prev => prev - 1);
  };

  const handleRemove = () => {
    Cart.removeItem(id);
  };

  return (
    <div className="CartCard">
      {/* <div className="CartCard__startBlock"> */}
      <button
        type="button"
        className="CartCard__deleteBtn"
        onClick={handleRemove}
        aria-label="Delete from Cart"
        data-cy="cartDeleteButton"
      >
        <i className="fas fa-xmark CartCard__icon" />
      </button>

      <Link
        to={link}
        className="CartCard__imageBlock CartCard__link"
        state={{ search: searchParams.toString(), prevPathname: pathname }}
      >
        <img
          className="CartCard__image"
          src={`${API_URL}/${image}`}
          alt={name}
        />
      </Link>

      <Link
        className="CartCard__name CartCard__link"
        to={link}
        state={{ search: searchParams.toString(), prevPathname: pathname }}
      >
        {name}
        <br />
        (iMT9G2FS/A)
      </Link>
      {/* </div> */}

      {/* <div className="CartCard__endBlock"> */}
      <div className="CartCard__quantityBlock">
        <button
          type="button"
          className={classNames('CartCard__quantityBtn', {
            'CartCard__quantityBtn--disabled': isMinusDisabled,
          })}
          aria-label="Minus Quantity"
          onClick={handleMinus}
        >
          <i className="fas fa-minus" />
        </button>

        <p className="CartCard__quantityCount">{currentQuantity}</p>

        <button
          type="button"
          className={classNames('CartCard__quantityBtn', {
            'CartCard__quantityBtn--disabled': isPlusDisabled,
          })}
          aria-label="Plus Quantity"
          onClick={handlePlus}
        >
          <i className="fas fa-plus" />
        </button>
      </div>

      <h2 className="CartCard__price">${quantity * price}</h2>
      {/* </div> */}
    </div>
  );
});

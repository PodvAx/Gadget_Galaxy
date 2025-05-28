import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames';

import { getPaginationRange } from '../../utils/helpers';

import './Pagination.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = memo(
  ({ total, perPage, currentPage, onPageChange }) => {
    const [siblingCount, setSiblingCount] = useState(1);
    const pagesCount = Math.ceil(total / perPage);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 375) {
          setSiblingCount(0);
        } else if (window.innerWidth < 768) {
          setSiblingCount(1);
        } else if (window.innerWidth < 1024) {
          setSiblingCount(3);
        } else if (window.innerWidth < 1440) {
          setSiblingCount(4);
        } else {
          setSiblingCount(5);
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // const pages = getNumbers(1, pagesCount);
    const paginationRange = getPaginationRange(
      pagesCount,
      currentPage,
      siblingCount,
    );

    const onPrev = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const onNext = () => {
      if (currentPage < pagesCount) {
        onPageChange(currentPage + 1);
      }
    };

    return (
      <nav className="Pagination" data-cy="pagination">
        <button
          type="button"
          className={classNames('Pagination__button Pagination__button--prev', {
            'Pagination__button--disabled': currentPage === 1,
          })}
          aria-label="Prev slide"
          onClick={onPrev}
          data-cy="paginationLeft"
        >
          <i className="fas fa-chevron-left Pagination__chevron" />
        </button>
        <ul className="Pagination__list">
          {/* {pages.map(pageNumber => (
            <li key={pageNumber}>
              <button
                type="button"
                className={classNames('Pagination__button', {
                  'Pagination__button--active': pageNumber === currentPage,
                })}
                onClick={() => {
                  if (pageNumber !== currentPage) {
                    onPageChange(pageNumber);
                  }
                }}
              >
                {pageNumber}
              </button>
            </li>
          ))} */}
          {paginationRange.map((item, idx) => (
            <li key={idx}>
              {item === '...' ? (
                <span className="Pagination__dots">...</span>
              ) : (
                <button
                  type="button"
                  className={classNames('Pagination__button', {
                    'Pagination__button--active': item === currentPage,
                  })}
                  onClick={() => onPageChange(Number(item))}
                  disabled={item === currentPage}
                >
                  {item}
                </button>
              )}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={classNames('Pagination__button Pagination__button--next', {
            'Pagination__button--disabled': currentPage === pagesCount,
          })}
          aria-label="Next slide"
          onClick={onNext}
          data-cy="paginationRight"
        >
          <i className="fas fa-chevron-right Pagination__chevron" />
        </button>
      </nav>
    );
  },
);

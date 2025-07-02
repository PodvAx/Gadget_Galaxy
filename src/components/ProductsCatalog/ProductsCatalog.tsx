import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { Select } from '../Select';
import { ProductList } from '../ProductList';
import { Pagination } from '../Pagination';
import { NoSearchResult } from '../NoSearchResult';

import { getFilteredProducts } from '../../utils/getFilteredProducts';
import { getSearchWith } from '../../utils/getSearchWith';

import { Param, Params } from '../../types/Params';
import { SortBy } from '../../types/SortBy';
import { SelectOptionType } from '../../types/SelectOtionsType';
import { Product } from '../../types/Product';

import './ProductsCatalog.scss';
import { Loader } from '../Loader';
import { Search } from '../Search';

type Props = {
  products: Product[];
};

const sortByOptions: SelectOptionType[] = [
  { label: 'Newest', optionValue: SortBy.Newest },
  { label: 'Alphabetically', optionValue: SortBy.Alphabetically },
  { label: 'Cheapest', optionValue: SortBy.Cheapest },
];

const perPageOptions: SelectOptionType[] = [
  { label: '16', optionValue: 16 },
  { label: 'All', optionValue: 'all' },
  { label: '4', optionValue: 4 },
  { label: '8', optionValue: 8 },
];

export const ProductsCatalog: React.FC<Props> = memo(({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();
  const [isFiltering, setIsFiltering] = useState(false);
  const [isSmallWindow, setIsSmallWindow] = useState(window.innerWidth < 1440);

  const isFavouritesPage = useMemo(
    () => pathname === '/favourites',
    [pathname],
  );

  const searchQuery = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || SortBy.Newest;
  const currentPage = +(searchParams.get('page') || 1);
  const perPageParam = searchParams.get('perPage') || 16;

  const perPage = useMemo(
    () => (perPageParam === 'all' ? perPageParam : +perPageParam),
    [perPageParam],
  );

  const setSearchWith = useCallback(
    (params: Params) => {
      const search = getSearchWith(params, searchParams);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const onFirstRender = useCallback(() => {
    const params: Params = isFavouritesPage
      ? { perPage: 'all', page: null, sortBy: null }
      : { page: currentPage, perPage, sortBy };

    setSearchWith(params);
  }, [currentPage, perPage, sortBy, isFavouritesPage, setSearchWith]);

  useEffect(() => {
    onFirstRender();
  }, [onFirstRender]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallWindow(window.innerWidth < 1440);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }

    const timeout = setTimeout(() => {
      setIsFiltering(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const filteredProducts = useMemo(() => {
    return getFilteredProducts({
      productsToFilter: products,
      sortBy,
      searchQuery,
    });
  }, [products, sortBy, searchQuery]);

  console.log('filteredProducts', filteredProducts);

  const slicedProducts = useMemo(() => {
    if (perPage === 'all') {
      return filteredProducts;
    }

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return filteredProducts.slice(start, end);
  }, [filteredProducts, perPage, currentPage]);

  // console.log('slicedProducts', slicedProducts);

  const isPaginationVisible = useMemo(
    () => perPage !== 'all' && filteredProducts.length > +perPage,
    [perPage, filteredProducts],
  );

  const handlePageChange = useCallback(
    (page: Param) => {
      setSearchWith({ page });
    },
    [setSearchWith],
  );

  const handleSortBySelect = useCallback(
    (sortByValue: Param) => {
      setSearchWith({ sortBy: sortByValue });
    },
    [setSearchWith],
  );

  const handlePerPageSelect = useCallback(
    (perPageValue: Param) => {
      setSearchWith({ perPage: perPageValue });
    },
    [setSearchWith],
  );

  const isSearchResult = useMemo(
    () => !!slicedProducts.length,
    [slicedProducts],
  );

  const isNoSearchProducts = !isFiltering && !isSearchResult;
  const isSearchProducts = !isFiltering && isSearchResult;

  return (
    <section className="ProductsCatalog">
      <div className="ProductsCatalog__count">
        {!!searchQuery.length && `${filteredProducts.length} results of `}
        {products.length} models
      </div>

      {isSmallWindow && (
        <div className="ProductsCatalog__search">
          <Search category={pathname.slice(1)} />
        </div>
      )}

      {isFiltering && <Loader />}

      {isNoSearchProducts && <NoSearchResult />}

      {isSearchProducts && (
        <>
          {!isFavouritesPage && (
            <section className="ProductsCatalog__options">
              <article
                className="
          ProductsCatalog__optionsBlock
          ProductsCatalog__optionsBlock--sortBy
          "
              >
                <p className="ProductsCatalog__optionLabel">Sort by</p>

                <Select
                  options={sortByOptions}
                  selectedValue={sortBy}
                  idOfSelect="sortBy"
                  onSelect={handleSortBySelect}
                />
              </article>

              <article
                className="
                  ProductsCatalog__optionsBlock
                  ProductsCatalog__optionsBlock--itemsOnPage
                  "
              >
                <p className="ProductsCatalog__optionLabel">Items on page</p>

                <Select
                  options={perPageOptions}
                  selectedValue={perPage}
                  idOfSelect="itemsOnPage"
                  onSelect={handlePerPageSelect}
                />
              </article>
            </section>
          )}

          <section className="ProductsCatalog__list">
            <ProductList products={slicedProducts} />
          </section>

          {isPaginationVisible && (
            <section className="ProductsCatalog__pagination">
              <Pagination
                total={filteredProducts.length}
                perPage={+perPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </section>
          )}
        </>
      )}
    </section>
  );
});

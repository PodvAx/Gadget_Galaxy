import React, { memo, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/scss';

import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
  section: string;
};

export const ProductsSlider: React.FC<Props> = memo(({ products, section }) => {
  const swiperRef = React.useRef<SwiperType>();
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, []);

  return (
    <Swiper
      modules={[Navigation, Mousewheel]}
      slidesPerView={4}
      grid={{ rows: 1, fill: 'column' }}
      spaceBetween={16}
      navigation={{
        nextEl: `.${section}__button--next`,
        prevEl: `.${section}__button--prev`,
        disabledClass: 'SliderBtn--disabled',
      }}
      allowTouchMove={isTouchDevice}
      mousewheel={!isTouchDevice}
      breakpoints={{
        0: { slidesPerView: 1 },
        564: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1440: { slidesPerView: 4 },
      }}
      onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
    >
      {products.map(product => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
});

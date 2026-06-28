import { Navigate, useNavigate } from 'react-router';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CarouselCard } from '@component/CarouselCard';
import { ROUTE } from '@constant';
import { useLatestMoviesQuery } from '@service';
import { urlify } from '@utils';

import { LatestMovieSkeleton } from './LatestMovie.skeleton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/a11y';
import 'swiper/css/autoplay';

export const LatestMovie = () => {
    const { data, isLoading, isError } = useLatestMoviesQuery();
    const navigate = useNavigate();

    const handleClick = (title: string) => {
        const url = urlify(`${ROUTE.MOVIE}/${title}`);
        void navigate(url);
    };

    return (
        <>
            {isLoading ? (
                <LatestMovieSkeleton />
            ) : (
                <Swiper
                    modules={[Navigation, Pagination, A11y, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {isError ? (
                        <Navigate to={ROUTE.ERROR} />
                    ) : (
                        data?.results.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <CarouselCard
                                    {...movie}
                                    handleClick={handleClick}
                                />{' '}
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            )}
        </>
    );
};

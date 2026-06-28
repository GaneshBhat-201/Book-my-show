import { LatestMovie } from 'container/LatestMovies/LatestMovie.container';
import { MovieList } from 'container/MovieList/MovieList.container';

import { MovieListContainer } from './Home.styles';

export const Home = () => (
    <>
        <LatestMovie />
        <MovieListContainer>
            <MovieList />
        </MovieListContainer>
    </>
);

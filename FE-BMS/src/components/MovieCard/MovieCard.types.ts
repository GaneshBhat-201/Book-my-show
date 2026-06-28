import { MovieResponseData } from '@services';

/**
 * Props type of the movie card component
 */
export type MovieCardProps = Pick<
    MovieResponseData,
    'name' | 'poster_url' | 'genres' | 'languages' | 'id'
>;

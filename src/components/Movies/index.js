import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import MovieCard from 'components/MovieCard';

const Movies = ({
  movies,
  onItemPosterClick,
}) => (
  <SimpleGrid
    columns={[1, 2, 2, 4, 5]}
    alignItems="center"
    spacing="14"
    mb="20"
    p="3"
  >
    {movies.map((movie, m) => (
      <MovieCard
        key={m}
        {...movie}
        onPosterClick={onItemPosterClick}
      />
    ))}
  </SimpleGrid>
);

export default Movies;

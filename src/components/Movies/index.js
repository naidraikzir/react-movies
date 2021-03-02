import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import MovieCard from 'components/MovieCard';

const Movies = ({
  movies,
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
      />
    ))}
  </SimpleGrid>
);

export default Movies;

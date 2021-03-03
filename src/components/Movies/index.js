import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';

const Movies = ({
  children,
}) => (
  <SimpleGrid
    columns={[1, 2, 2, 4, 5]}
    alignItems="center"
    spacing="14"
    mb="20"
    p="3"
  >
    {children}
  </SimpleGrid>
);

export default Movies;

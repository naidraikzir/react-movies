import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Fade,
  Grid,
  GridItem,
  Img,
} from '@chakra-ui/react';

import { fetchMovie } from 'api';
import MovieDescription from 'components/MovieDescription';
import Error from 'components/Error';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const fetched = !!Object.keys(movie).length;

  const fetch = useCallback(async () => {
    try {
      const data = await fetchMovie(id);
      if (data.Error) {
        setError(data.Error);
      } else {
        setMovie(data);
      }
    } catch (error) {
      setError(error);
    }
  }, [id]);

  useEffect(() => {
    fetch();
  }, [id, fetch]);

  return (
    <Container
      maxW="container.xl"
      mt="6"
    >
      {error && <Error error={error} />}

      <Fade in={fetched}>
        <Grid
          templateColumns={{ base: '1fr 1fr', lg: '2fr 4fr' }}
          gap="10"
        >
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Img
              src={movie.Poster}
              alignSelf="center"
              w="100%"
              rounded="2xl"
            />
          </GridItem>

          <GridItem colSpan={{ base: 2, md: 1 }}>
            <MovieDescription {...movie} />
          </GridItem>
        </Grid>
      </Fade>
    </Container>
  );
};

export default Movie;

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Fade,
  Grid,
  GridItem,
  Img,
  Skeleton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { fetchMovie } from 'api';
import none from 'assets/none.png'
import MovieDescription from 'components/MovieDescription';
import Error from 'components/Error';

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState('');
  const [imageIsError, setImageIsError] = useState(false)
  const fetched = !!Object.keys(movie).length;
  const loaderDetailBg = useColorModeValue('rgba(255, 255, 255, 0.5)', 'gray.800');

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

      {!fetched && (
        <Fade in={!fetched}>
          <Grid
            templateColumns={{ base: '1fr 1fr', lg: '2fr 4fr' }}
            gap="10"
          >
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <Skeleton height="500px" borderRadius="10px" />
            </GridItem>

            <GridItem colSpan={{ base: 2, md: 1 }}>
              <Box
                bg={loaderDetailBg}
                p={{ base: 4, sm: 8 }}
                rounded={{ md: '2xl' }}
                shadow={{ md: 'xl' }}
                pos="relative"
                left={{ md: '-5em' }}
                top={{ base: '-5em', md: '5em' }}
                sx={{ backdropFilter: 'blur(20px)' }}
              >
                <Stack spacing="20px">
                  {Array.from(Array(5)).map((_, i) => (
                    <Skeleton height="30px" key={i} />
                  ))}
                </Stack>
              </Box>
            </GridItem>
          </Grid>
        </Fade>
      )}

      <Fade in={fetched}>
        <Grid
          templateColumns={{ base: '1fr 1fr', lg: '2fr 4fr' }}
          gap="10"
        >
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Img
              src={!imageIsError ? movie.Poster : none}
              alignSelf="center"
              w="100%"
              rounded="2xl"
              onError={() => setImageIsError(true)}
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

import React, { useCallback, useEffect, useState } from 'react';
import {
  ChakraProvider,
  Container,
  SimpleGrid,
  Box,
  theme,
  Button,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import request from './request';
import MovieCard from 'components/MovieCard';
import Navbar from 'components/Navbar';
import SearchBox from 'components/SearchBox';

function App() {
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const fetch = useCallback(async () => {
    const { data } = await request.get('/', {
      params: {
        s: search,
        page,
        type: 'movie'
      }
    });
    if (data.Error) {
      setError(data.Error);
      setMovies([]);
    } else {
      setError('');
      setMovies(data.Search);
    }
  }, [search, page]);

  useEffect(() => {
    if (search.length) fetch();
    else if (!search.length) {
      setMovies([]);
      setError('');
    }
  }, [search, fetch]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Container
        maxW="container.xl"
        pb="10"
      >
        <Container
          maxW="container.md"
          mt="5"
          mb="10"
        >
          <SearchBox
            value={search}
            onInput={setSearch}
          />
        </Container>

        {error && <Box
          color="gray.300"
          my="20"
          textAlign="center"
        >
          <WarningTwoIcon
            w="20"
            h="20"
          />
          <Heading
            size="lg"
            mt="4"
          >
            {error}
          </Heading>
        </Box>}

        <SimpleGrid
          columns={[1, 2, 2, 4, 5]}
          alignItems="center"
          spacing="14"
          mb="20"
          p="3"
        >
          {movies.map((movie, m) => <MovieCard key={m} {...movie} />)}
        </SimpleGrid>

        {!!movies.length && <Flex justifyContent="center">
          <Button
            colorScheme="purple"
            w="40"
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Flex>}
      </Container>
    </ChakraProvider>
  );
}

export default App;

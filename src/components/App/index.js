import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChakraProvider,
  Container,
  theme,
  Button,
  Flex,
} from '@chakra-ui/react';
import Navbar from 'components/Navbar';
import SearchBox from 'components/SearchBox';
import Movies from 'components/Movies';
import Error from 'components/Error';
import {
  setPage,
  setSearch,
  resetSearch,
} from 'actions';

function App() {
  const { page, search, movies, error } = useSelector(state => state);
  const dispatch = useDispatch();

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
            onInput={({ target }) => dispatch(setSearch(target.value))}
            onReset={() => dispatch(resetSearch())}
          />
        </Container>

        {error && <Error error={error} />}
        <Movies movies={movies} />

        {!!movies.length && <Flex justifyContent="center">
          <Button
            colorScheme="purple"
            w="40"
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next
          </Button>
        </Flex>}
      </Container>
    </ChakraProvider>
  );
}

export default App;

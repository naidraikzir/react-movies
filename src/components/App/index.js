import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ChakraProvider,
  Container,
  theme,
} from '@chakra-ui/react';
import Navbar from 'components/Navbar';
import SearchBox from 'components/SearchBox';
import Movies from 'components/Movies';
import Error from 'components/Error';
import {
  setSearch,
  resetSearch,
} from 'actions';
import { fetchMovies } from 'api';

function App() {
  const [loader, setLoader] = useState(null);
  const observer = useRef(null);
  const { search = '', movies, error } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && movies.length && !error.length) {
        fetchMovies();
      }
    });
    const { current: currentObserver } = observer;
    if (loader) currentObserver.observe(loader);
    return () => currentObserver.disconnect();
  }, [movies, error, loader]);

  const onSearchEnter = ({ target }) => {
    if (target.value.length) {
      fetchMovies();
    }
  };

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
            onEnter={onSearchEnter}
            onReset={() => dispatch(resetSearch())}
          />
        </Container>

        {error && <Error error={error} />}
        <Movies movies={movies} />

        {!!movies.length && <div ref={setLoader} />}
      </Container>
    </ChakraProvider>
  );
}

export default App;

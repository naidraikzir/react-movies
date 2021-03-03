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
import LightBox from 'components/LightBox';
import Error from 'components/Error';
import {
  setSearch,
  resetSearch,
  setPreview,
  resetPreview,
} from 'store/actions';
import { fetchMovies } from 'api';

function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(null);
  const observer = useRef(null);
  const {
    search = '',
    movies,
    preview,
    error,
  } = useSelector(state => state);

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
        <Movies
          movies={movies}
          onItemPosterClick={poster => dispatch(setPreview(poster))}
        />

        {!!movies.length && <div ref={setLoader} />}
      </Container>

      {preview && <LightBox
        image={preview}
        isOpen={preview}
        onClose={() => dispatch(resetPreview())}
      />}
    </ChakraProvider>
  );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import MovieCard from 'components/MovieCard';

import { fetchMovies } from 'api';
import {
  setSearch,
  resetSearch,
  setPreview,
} from 'store/actions';
import SearchBox from 'components/SearchBox';
import Movies from 'components/Movies';
import Error from 'components/Error';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const observer = useRef(null);
  const [loader, setLoader] = useState(null);
  const {
    search = '',
    movies,
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

      <Movies>
        {movies.map((movie, m) => (
          <MovieCard
            key={m}
            {...movie}
            onPosterClick={() => dispatch(setPreview(movie.Poster))}
            onTitleClick={() => history.push(`/${movie.imdbID}`)}
          />
        ))}
      </Movies>

      {!!movies.length && <div ref={setLoader} />}
    </Container>
  );
};

export default Home;

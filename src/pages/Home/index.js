import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import MovieCard from 'components/MovieCard';

import { fetchMovies } from 'api';
import {
  setMovies,
  resetMovies,
  setSearch,
  resetSearch,
  setPage,
  setPreview,
  setError,
  resetError,
} from 'store/actions';
import SearchBox from 'components/SearchBox';
import Movies from 'components/Movies';
import Error from 'components/Error';

// API default
const PER_PAGE = 10;

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const observer = useRef(null);
  const [totalResults, setTotalResults] = useState(0);
  const [fetched, setFetched] = useState(false);
  const [loader, setLoader] = useState(null);
  const {
    search = '',
    movies,
    page,
    error,
  } = useSelector(state => state);

  const fetch = useCallback(async () => {
    try {
      const data = await fetchMovies(page, search);
      if (data.Error) {
        dispatch(setError(data.Error));
        dispatch(resetMovies());
      } else {
        dispatch(resetError());
        dispatch(setMovies(data.Search));
        dispatch(setPage(page + 1));
        setTotalResults(data.totalResults);
      }
    } catch (error) {
      dispatch(setError(error));
      dispatch(resetMovies());
    } finally {
      setFetched(true);
    }
  }, [dispatch, page, search]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && movies.length && !error.length) {
        fetch();
      }
    });
    const { current: currentObserver } = observer;
    if (loader) currentObserver.observe(loader);
    return () => currentObserver.disconnect();
  }, [movies, error, loader, fetch]);

  const onSearchEnter = ({ target }) => {
    if (target.value.length) fetch();
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

      {fetched && movies.length + PER_PAGE < totalResults && <div ref={setLoader} />}
    </Container>
  );
};

export default Home;

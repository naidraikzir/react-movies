import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
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
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import SearchBox from 'components/SearchBox';
import Movies from 'components/Movies';
import Error from 'components/Error';

// API default
const PER_PAGE = 10;

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const loaderRef = useRef(null);
  const [totalResults, setTotalResults] = useState(0);
  const {
    search = '',
    movies = [],
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
    }
  }, [dispatch, page, search]);

  const onSearchEnter = ({ target }) => {
    if (target.value.length) {
      history.push({
        pathname: location.pathname,
        search: `?search=${target.value}`
      })
      fetch();
    }
  };

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      dispatch(setSearch(params.get('search')));
    } else {
      dispatch(resetSearch());
    }
  }, [location.search, dispatch])

  useIntersectionObserver({
    target: loaderRef,
    onIntersect: ([entry]) => {
      if (
        entry.isIntersecting
        && movies.length
        && movies.length + PER_PAGE <= totalResults
      ) {
        fetch();
      }
    },
  });

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

      <div ref={loaderRef} />
    </Container>
  );
};

export default Home;

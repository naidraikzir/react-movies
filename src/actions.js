import api from 'api';
import store from 'store';

export const fetch = async () => {
  const { search, page } = store.getState();
  try {
    const { data } = await api.get('/', {
      params: {
        s: search,
        page,
        type: 'movie'
      }
    });
    if (data.Error) {
      store.dispatch(setError(data.Error));
      store.dispatch(resetMovies());
    } else {
      store.dispatch(resetError());
      store.dispatch(setMovies(data.Search));
    }
  } catch ({ response }) {
    store.dispatch(setError(response.data.Error));
  }
};

export const setPage = payload => ({
  type: 'SET_PAGE',
  payload,
});

export const setSearch = payload => {
  if (payload.length) {
    fetch();
  } else {
    store.dispatch(resetMovies());
    store.dispatch(resetError());
  }
  return {
    type: 'SET_SEARCH',
    payload,
  };
};

export const resetSearch = () => {
  store.dispatch(resetMovies());
  store.dispatch(resetError());
  return {
    type: 'RESET_SEARCH',
  }
};

export const setMovies = payload => ({
  type: 'ADD_MOVIES',
  payload,
});

export const resetMovies = () => ({
  type: 'RESET_MOVIES',
});

export const setError = payload => ({
  type: 'SET_ERROR',
  payload,
});

export const resetError = () => ({
  type: 'RESET_ERROR',
});

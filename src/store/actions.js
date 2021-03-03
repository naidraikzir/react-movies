import store from '.';

export const setPage = payload => ({
  type: 'SET_PAGE',
  payload,
});

export const resetPage = payload => ({
  type: 'RESET_PAGE',
  payload,
});

export const setSearch = payload => {
  store.dispatch(resetMovies());
  store.dispatch(resetError());
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

export const resetMovies = () => {
  store.dispatch(resetPage());
  return ({
    type: 'RESET_MOVIES',
  });
};

export const setPreview = payload => ({
  type: 'SET_PREVIEW',
  payload,
});

export const resetPreview = payload => ({
  type: 'RESET_PREVIEW',
});

export const setError = payload => ({
  type: 'SET_ERROR',
  payload,
});

export const resetError = () => ({
  type: 'RESET_ERROR',
});
